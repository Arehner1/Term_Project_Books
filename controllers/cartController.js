const CartModel = require('../models/cartModel');

exports.getCart = async (req, res) => {
  try {
    const cart = await CartModel.getCartByUserId(req.params.userId);
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await CartModel.addToCart(req.params.userId, productId, quantity);
    res.json(result);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await CartModel.removeFromCart(req.params.userId, productId);
    res.json(result);
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

exports.checkoutCart = async (req, res) => {
  try {
    const result = await CartModel.checkoutCart(req.params.userId);
    res.json(result);
  } catch (err) {
    console.error("Error checking out cart:", err);
    res.status(500).json({ error: "Failed to checkout" });
  }
};