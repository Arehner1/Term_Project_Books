const AdminModel = require('../models/adminModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await AdminModel.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error("Admin getAllProducts error:", err);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await AdminModel.getProductById(id);
        res.json(product);
    } catch (err) {
        console.error("Admin getProductById error:", err);
        res.status(500).json({ error: "Failed to retrieve product" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await AdminModel.updateProduct(id, data);
        res.json({ message: "Product updated" });
    } catch (err) {
        console.error("Admin updateProduct error:", err);
        res.status(500).json({ error: "Failed to update product" });
    }
};

// Add new product
exports.addProduct = async (req, res) => {
    const data = req.body;

    try {
        const result = await AdminModel.addProduct(data);
        res.json({ message: "Product added", id: result.id });
    } catch (err) {
        console.error("Admin addProduct error:", err);
        res.status(500).json({ error: "Failed to add product" });
    }
};

// Bulk upload
exports.bulkUpload = async (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: "Invalid input format" });
    }

    try {
        await AdminModel.bulkUpload(products);
        res.json({ message: "Bulk upload successful" });
    } catch (err) {
        console.error("Admin bulkUpload error:", err);
        res.status(500).json({ error: "Bulk upload failed" });
    }
};

// Delete item
exports.deleteProduct = async (req, res) => {
    try {
        await AdminModel.deleteProduct(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Failed to delete product" });
    }
};

