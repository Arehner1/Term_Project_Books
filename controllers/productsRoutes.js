const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);

module.exports = router;
