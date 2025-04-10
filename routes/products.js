const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get a product by id
router.get('/products/:id', productController.getProductById);

// Route to add a product 
router.post('/cart', productController.addToCart);

// Route to remove a product 
router.delete('/cart/:cart_id/:product_id', productController.removeFromCart);

module.exports = router;
