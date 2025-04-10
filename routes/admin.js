const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add a new product to the catalog
router.post('/add', adminController.addProduct);

// Update an existing product by its ID (admin only)
router.put('/edit/:id', adminController.updateProduct);

// Bulk upload multiple new products 
router.post('/bulk', adminController.bulkUploadProducts);

module.exports = router;
