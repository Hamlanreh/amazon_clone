const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Factory = require('./controllerFactory');
const Order = require('../models/orderModel');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const filterFields = require('../utils/filterFields');

exports.createSecret = catchAsync(async (req, res) => {
  const { total } = req.body;

  const intent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res
    .status(httpStatusCodes.CREATED)
    .json({ client_secret: intent.client_secret });
});

exports.filterData = (req, res, next) => {
  req.body = filterFields(req.body, 'items');
  next();
};

exports.filterUpdateData = (req, res, next) => {
  req.body = filterFields(req.body, 'status');
  next();
};

exports.getUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getAllOrders = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Order.find({ user: req.body.user }),
    req.query
  )
    .filter(
      { ...req.query },
      'status',
      'totalQuantity',
      'totalPrice',
      'createdAt'
    )
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate({
    path: 'items',
    populate: { path: 'product', select: 'name photo price ratingsAverage' },
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

exports.createOrder = Factory.createOne(Order);
exports.getOrder = Factory.getOne(Order, { path: 'user' });
exports.updateOrder = Factory.updateOne(Order);
exports.deleteOrder = Factory.deleteOne(Order);
