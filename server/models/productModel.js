const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product must have a name'],
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price'],
    },
    category: {
      type: String,
      lowercase: true,
      required: [true, 'Product must have category.'],
      enum: {
        values: [
          'books',
          'health',
          'furniture',
          'electronics',
          'fashion',
          'equipment',
          'sports',
          'kitchen',
        ],
        message:
          'Product must be categorized as (electronics, books, technology, games, sport, fashion)',
      },
    },
    photo: {
      type: String,
      required: [true, 'Product must have an image'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Product minimum rating is 1.0'],
      max: [5, 'Product maximum rating is 5.0'],
      set: value => Math.round(value * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Product discount should be below the price',
      },
    },
  },
  {
    collation: { locale: 'en_US', strength: 2 },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index
productSchema.index({ name: 1, price: 1, category: 1, ratingsAverage: 1 });

// Virtuals populate
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// Middlewares
productSchema.pre('save', function (next) {
  // Change the photo name
  this.photo = `product-${this.id}.jpeg`;
  next();
});

productSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
