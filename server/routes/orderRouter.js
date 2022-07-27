const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/create-checkout-session', orderController.createCheckoutSesssion);

router
  .route('/')
  .get(orderController.getUserId, orderController.getAllOrders)
  .post(
    orderController.filterData,
    orderController.getUserId,
    orderController.createOrder
  );

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.filterUpdateData, orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
