const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// CRUD routes for admin
router.get('/products', adminController.getAllProducts);
router.get('/products/:id', adminController.getProductById);
router.put('/products/:id', adminController.updateProduct);
router.post('/products', adminController.addProduct);
router.post('/products/bulk', adminController.bulkUpload);

module.exports = router;
