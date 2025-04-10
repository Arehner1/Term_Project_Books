const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get the current cart for a specific user
router.get('/:userId', cartController.getCart);

// Add a product to a specific user's cart
router.post('/:userId/add', cartController.addToCart);

// Remove a product
router.post('/:userId/remove', cartController.removeFromCart);

// Checkout and clear
router.post('/:userId/checkout', cartController.checkoutCart);

module.exports = router;
