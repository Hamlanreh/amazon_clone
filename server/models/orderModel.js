const mongoose = require('mongoose');
const Product = require('./productModel');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to user'],
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order must belong to product'],
      },
      quantity: {
        type: Number,
        min: [0, 'Ordered quantity must be at least 1'],
        required: [true, 'Order must be quantified'],
      },
    },
  ],
  totalQuantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Order must have date'],
  },
  status: {
    type: String,
    enum: ['incomplete', 'completed'],
    default: 'incomplete',
    select: false,
  },
});

// Middlewares
orderSchema.pre('save', async function (next) {
  // Calculate total price of items
  const quantities = [];
  const promiseProducts = this.items.map(async item => {
    quantities.push(item.quantity);
    return await Product.findById(item.product, { price: 1 });
  });
  const products = await Promise.all(promiseProducts);

  let totalPrice = 0;
  let totalQuantity = 0;

  products.forEach((product, index) => {
    totalQuantity += quantities[index];
    totalPrice += product.price * quantities[index];
  });

  this.totalQuantity = totalQuantity;
  this.totalPrice = totalPrice;
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
