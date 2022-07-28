const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'A user must have an email'],
    unique: [true, 'Provide a unique email address'],
    validate: [validator.isEmail, 'Provide valid email'],
  },
  photo: {
    type: String,
    default:
      'https://res.cloudinary.com/hamlanreh/image/upload/v1658823381/amazon_clone/uploads/userUpload/default_yrwm6n.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'seller', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Please ensure password and confirmation are the same',
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

// Indexes
userSchema.index({ name: 1 });

// Middlewares
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Encrypt the password and delete passwordConfirm
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

userSchema.pre(/^find/, function (next) {
  // Find active user only
  this.find({ active: true });
  next();
});

// Instance method
userSchema.methods.correctPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetPasswordToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');
  this.passwordResetTokenExpires = Date.now() + 1000 * 60 * 10;

  return resetPasswordToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
