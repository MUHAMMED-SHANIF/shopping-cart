const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);
router.get('/', cartController.getCart);
router.post('/checkout', cartController.checkout);
router.post('/loyalty', cartController.setLoyaltyLevel);
router.post('/set-quantity', cartController.setCartItemQuantity);

module.exports = router; 