const express = require('express');
const reviewRouter = require('./reviewRouter');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

const router = express.Router();

// Route to reviews router
// api/v1/products/4a43dsfs/reviews
router.use('/:productId/reviews', reviewRouter);

router.get('/top-category-products', productController.getTopCategoryProducts);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('admin'),
    productController.uploadProductPhoto,
    productController.filterData,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.restrictTo('admin'),
    productController.uploadProductPhoto,
    productController.resizeProductPhoto,
    productController.filterData,
    productController.updateProduct
  )
  .delete(authController.restrictTo('admin'), productController.deleteProduct);

module.exports = router;
