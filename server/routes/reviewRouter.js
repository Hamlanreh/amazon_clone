const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.get('/', reviewController.getAllReviews);

router.use(authController.protect);

router
  .route('/')
  .post(
    reviewController.filterData,
    reviewController.getUserAndProductId,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.filterData, reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
