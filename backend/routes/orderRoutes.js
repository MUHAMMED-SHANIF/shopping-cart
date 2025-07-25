const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/place', orderController.placeOrder);
router.get('/history/:userId', orderController.getOrderHistory);
router.get('/most-category/:userId', orderController.getMostPurchasedCategory);
router.get('/loyalty/:userId', orderController.getLoyaltyLevel);

module.exports = router; 