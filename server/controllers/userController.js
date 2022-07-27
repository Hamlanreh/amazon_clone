const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Factory = require('./controllerFactory');
const streamUpload = require('../utils/streamUpload');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const filterFields = require('../utils/filterFields');
const httpStatusCodes = require('../utils/httpStatusCodes');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new ErrorHandler('Please upload user image', httpStatusCodes.BAD_REQUEST),
      false
    );
  }
};

exports.uploadUserPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Process the image to buffer
  const data = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  // Create upload stream
  const upload = await streamUpload(data, {
    folder: 'amazon_clone/uploads/userUpload/',
    public_id: `user-${req.user.id}`,
  });

  req.file.filename = upload.url;

  next();
});

exports.filterData = (req, res, next) => {
  req.body = filterFields(req.body, 'name');
  if (req.file) req.body.photo = req.file.filename;
  next();
};

exports.getAllUsers = Factory.getAll(User, 'name');
exports.getUser = Factory.getOne(User);
exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);
