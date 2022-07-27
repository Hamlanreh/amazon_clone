const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review must not be empty'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to product'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to user'],
  },
  rating: {
    type: Number,
    min: [1, 'Review  minimum rating is 1.0'],
    max: [5, 'Review maximun rating is 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Review must have created date'],
  },
});

// Indexing
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.post('save', async function () {
  // Calculate total ratings and ratings avergage
  const result = await this.constructor.calcAvgRatings(this.product);

  await Product.findByIdAndUpdate(this.product, {
    ratingsQuantity: result[0].ratingsQuantity,
    ratingsAverage: result[0].ratingsAverage,
  });
});

reviewSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

reviewSchema.post(/^findOneAndDelete/, async function (doc) {
  const result = await doc.constructor.calcAvgRatings(doc.product);

  await Product.findByIdAndUpdate(doc.product, {
    ratingsQuantity: result[0].ratingsQuantity,
    ratingsAverage: result[0].ratingsAverage,
  });
});

reviewSchema.statics.calcAvgRatings = async function (productId) {
  return await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: '$rating' },
      },
    },
  ]);
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
