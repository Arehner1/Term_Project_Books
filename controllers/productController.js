const ProductModel = require('../models/productModel');

const productController = {
    // Get all products (stub data)
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.getAllProducts();
            res.json(products); // Return stubbed products
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve products' });
        }
    },

    // Get a product by its ID (stub data)
    getProductById: async (req, res) => {
        const { id } = req.params;

        try {
            const product = await ProductModel.getProductById(id);
            res.json(product); // Return the stubbed product
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve product' });
        }
    },

    // Add a product to the cart (stub data)
    addToCart: async (req, res) => {
        const { cart_id, product_id, quantity } = req.body;

        try {
            const result = await ProductModel.addToCart(cart_id, product_id, quantity);
            res.json(result); // Return stubbed response
        } catch (err) {
            res.status(500).json({ error: 'Failed to add to cart' });
        }
    },

    // Remove a product from the cart (stub data)
    removeFromCart: async (req, res) => {
        const { cart_id, product_id } = req.params;

        try {
            const result = await ProductModel.removeFromCart(cart_id, product_id);
            res.json(result); // Return stubbed response
        } catch (err) {
            res.status(500).json({ error: 'Failed to remove from cart' });
        }
    }
};

module.exports = productController;