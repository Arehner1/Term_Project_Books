const ProductModel = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
  const category = req.query.category || null;
  const sort = req.query.sort || null;

  try {
    const products = await ProductModel.getAllProducts(category, sort);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.getProductById(id);
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, category_id, image_url, price, status } = req.body;

  try {
    const newProduct = await ProductModel.createProduct({
      name,
      description,
      category_id,
      image_url,
      price,
      status
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, image_url, price, status } = req.body;

  try {
    const updated = await ProductModel.updateProduct(id, {
      name,
      description,
      category_id,
      image_url,
      price,
      status
    });

    if (updated) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct
};
