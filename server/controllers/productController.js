const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
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
      new ErrorHandler(
        'Please upload product image',
        httpStatusCodes.BAD_REQUEST
      ),
      false
    );
  }
};

exports.uploadProductPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('photo');

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Process the image to buffer
  const data = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  // Create upload stream
  const upload = await streamUpload(data, {
    folder: 'amazon_clone/uploads/productUpload/',
    public_id: `product-${req.params.id}`,
  });

  req.file.filename = upload.url;

  next();
});

exports.filterData = (req, res, next) => {
  req.body = filterFields(
    req.body,
    'name',
    'price',
    'category',
    'priceDiscount'
  );
  if (req.file) req.body.photo = req.file.filename;

  next();
};

exports.getAllProducts = Factory.getAll(
  Product,
  'name',
  'price',
  'category',
  'ratingsAverage'
);

exports.createProduct = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.photo = 'placeholder.jpeg';

  const newProduct = await Product.create(req.body);

  // Process the image to buffer
  const data = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  // Create upload stream
  const upload = await streamUpload(data, {
    folder: 'amazon_clone/uploads/productUpload/',
    public_id: `product-${newProduct.id}`,
  });

  const newProductUpdated = await Product.findByIdAndUpdate(
    newProduct.id,
    { photo: upload.url },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!newProduct)
    return next(
      new ErrorHandler(
        'Provide all document information',
        httpStatusCodes.BAD_REQUEST
      )
    );

  res.status(httpStatusCodes.CREATED).json({
    status: 'success',
    data: { product: newProductUpdated },
  });
});

// exports.getProduct = Factory.getOne(Product, { path: 'reviews' });
exports.getProduct = Factory.getOne(Product);
exports.updateProduct = Factory.updateOne(Product);
exports.deleteProduct = Factory.deleteOne(Product);

exports.getTopCategoryProducts = catchAsync(async (req, res, next) => {
  const topCategoryProducts = await Product.aggregate([
    {
      $match: { price: { $gt: 0 } },
    },
    { $sort: { ratingsAverage: -1, ratingsQuantity: -1 } },
    {
      $group: {
        _id: { $toUpper: '$category' },
        products: {
          $push: {
            id: '$_id',
            name: '$name',
            price: '$price',
            category: '$category',
            photo: '$photo',
            ratingsAverage: '$ratingsAverage',
            ratingsQuantity: '$ratingsQuantity',
            priceDiscount: '$priceDiscount',
          },
        },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: { _id: 1, products: { $slice: ['$products', 12] } },
    },
  ]);

  if (!topCategoryProducts)
    return next(
      new ErrorHandler(
        'Product category does not exist',
        httpStatusCodes.BAD_REQUEST
      )
    );

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    length: topCategoryProducts.length,
    data: topCategoryProducts,
  });
});
