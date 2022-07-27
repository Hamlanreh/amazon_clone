const Review = require('../models/reviewModel');
const Factory = require('./controllerFactory');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const filterFields = require('../utils/filterFields');

exports.filterData = (req, res, next) => {
  req.body = filterFields(req.body, 'review', 'rating');
  next();
};

exports.getUserAndProductId = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.product = req.params.productId;
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Review.find({ product: req.params.productId }),
    req.query
  )
    .filter(
      { ...req.query },
      'review',
      'product',
      'user',
      'rating',
      'createdAt'
    )
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate({
    path: 'user',
    select: 'name photo',
  });
  const docs = await query;

  if (!docs)
    return next(
      new ErrorHandler(
        'No document found with that ID',
        httpStatusCodes.NOT_FOUND
      )
    );

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    length: docs.length,
    data: docs,
  });
});

exports.createReview = Factory.createOne(Review);
exports.getReview = Factory.getOne(Review);
exports.updateReview = Factory.updateOne(Review);
exports.deleteReview = Factory.deleteOne(Review);
