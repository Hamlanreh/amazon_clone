const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Email = require('../utils/emailBuilder');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');

const sendToken = (user, statusCode, req, res) => {
  // Create jwt token signature
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  // Create jwt cookie
  res.cookie('jwt', token, {
    expires: process.env.TOKEN_COOKIE_EXPIRES,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });

  // Send token and user to client
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.getMe = (req, res, next) => {
  const token = jwt.decode(req.cookies.jwt);

  if (!token) {
    return res.status(httpStatusCodes.OK).json({
      status: 'success',
      user: {},
    });
  }

  req.params.id = token.id;
  next();
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (!newUser)
    return next(
      new ErrorHandler(
        'Provide valid name, email or password',
        httpStatusCodes.BAD_REQUEST
      )
    );

  // Send welcome message
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  sendToken(newUser, httpStatusCodes.CREATED, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new ErrorHandler(
        'Provide an email and password.',
        httpStatusCodes.BAD_REQUEST
      )
    );

  let user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(
      new ErrorHandler(
        'Incorrect email or password',
        httpStatusCodes.UNAUTHORIZED
      )
    );

  // Hide user password
  user.password = undefined;

  sendToken(user, httpStatusCodes.OK, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(httpStatusCodes.OK).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Token from jwt auth bearer
    token = req.headers.authorization.split(' ')[1];
  } else {
    // Token from jwt cookie
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new ErrorHandler(`You're not logged in.`, httpStatusCodes.UNAUTHORIZED)
    );

  // Token and user verification
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new ErrorHandler(`User does not exist`, httpStatusCodes.NOT_FOUND)
    );

  // Allow user access
  req.user = user;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    const allowedRoles = [...roles];

    if (!allowedRoles.includes(req.user.role))
      return next(
        new ErrorHandler(
          'No permission to perform action',
          httpStatusCodes.UNAUTHORIZED
        )
      );

    next();
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(
      new ErrorHandler(
        'This user account does not exist',
        httpStatusCodes.BAD_REQUEST
      )
    );

  const resetPasswordToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Send reset password message
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetpassword/${resetPasswordToken}`;
  await new Email(user, resetPasswordUrl).sendResetPassword();

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    message: 'Reset password token has been successfully sent',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedResetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedResetPasswordToken,
  });

  if (!user)
    return next(
      new ErrorHandler('This user does not exist', httpStatusCodes.BAD_REQUEST)
    );

  // Check for reset token password expiry
  const resetTokenExpiresAt = new Date(
    user.passwordResetTokenExpires
  ).getTime();

  if (Date.now() > resetTokenExpiresAt) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      'Your reset password token has expired',
      httpStatusCodes.BAD_REQUEST
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  sendToken(user, httpStatusCodes.OK, req, res);
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(
      new Error(
        `You must be logged in to deactivate account`,
        httpStatusCodes.UNAUTHORIZED
      )
    );
  }

  const deactivatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );

  // Send Deactivate Message
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(deactivatedUser, url).sendDeactivateAccount();

  res.status(httpStatusCodes.NO_CONTENT).json({
    status: 'success',
    data: null,
  });
});

exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new Error(
        `You must be logged in to update password`,
        httpStatusCodes.UNAUTHORIZED
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  sendToken(user, httpStatusCodes.OK, req, res);
});
