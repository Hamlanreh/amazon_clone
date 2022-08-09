const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Factory = require('./controllerFactory');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const filterFields = require('../utils/filterFields');

exports.createCheckoutSesssion = catchAsync(async (req, res, next) => {
  const items = req.body.items.map(item => ({
    product: item.id,
    quantity: item.amount,
  }));
  const { email } = await User.findById(req.user.id, { email: 1 });

  if (!items)
    return next(
      new ErrorHandler(
        'Checkout with selected produts',
        httpStatusCodes.NOT_FOUND
      )
    );

  const promiseItems = items.map(async item => {
    const { name, price } = await Product.findById(item.product, {
      id: 1,
      name: 1,
      price: 1,
    });

    return {
      price_data: {
        currency: 'usd',
        product_data: { name },
        unit_amount: price * 100,
      },
      quantity: item.quantity,
    };
  });

  // Create stripe session with cart items
  const cartItems = await Promise.all(promiseItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [...cartItems],
    mode: 'payment',
    success_url: `https://amazon-clone-mern-dev.herokuapp.com/success`, // Payment success
    cancel_url: `https://amazon-clone-mern-dev.herokuapp.com/cancel`, // Payment failure
  });

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    session,
  });
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
    .sort('-createdAt')
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
