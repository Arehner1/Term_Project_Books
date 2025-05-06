const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/add', adminController.addProduct);
router.put('/edit/:id', adminController.updateProduct);
router.post('/bulk', adminController.bulkUpload);

module.exports = router;
