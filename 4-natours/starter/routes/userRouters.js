const express = require('express');
const userController = require('./../Controller/userController');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUSers)
  .post(userController.addNewUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
