const express = require('express');
const router = express.Router();

const orderController = require('./../controllers/order.controllers');
// const checkAuth = require('../middleware/check-auth');

router.get('/', orderController.getOrders);
router.post('/', orderController.placeOrder);
router.get('/id', orderController.getOrderByID);
router.put('/', orderController.putUser);
router.put('/changeStatus', orderController.changeStatus);
// router.get('/Register', SampleController.sample);

module.exports = router;
