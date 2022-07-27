const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .get('/me', authController.getMe, userController.getUser)
  .post('/signup', authController.signup)
  .post('/login', authController.login)
  .post('/logout', authController.logout)
  .post('/forgotpassword', authController.forgotPassword)
  .patch('/resetpassword/:token', authController.resetPassword);

// Authorization protection
router.use(authController.protect);

router
  .patch('/updatepassword', authController.updateUserPassword)
  .delete('/deactivate', authController.deactivateUser);

// Role restrictions
router.get('/', authController.restrictTo('admin'), userController.getAllUsers);

router
  .route('/:id')
  .get(authController.restrictTo('admin', 'user'), userController.getUser)
  .patch(
    authController.restrictTo('admin', 'user'),
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.filterData,
    userController.updateUser
  )
  .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
