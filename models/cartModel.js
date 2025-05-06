const dbPromise = require('../db');

const CartModel = {
  // Get a user's cart and return product details including images
  getCartByUserId: async (userId) => {
    const db = await dbPromise;

    const cart = await db.get(
      `SELECT * FROM carts WHERE user_id = ? AND status = 'new'`,
      [userId]
    );
    if (!cart) return { userId, items: [] };

    const items = await db.all(`
      SELECT 
        p.id AS product_id,
        p.name AS title,
        p.price,
        p.image_url AS image,
        cp.quantity
      FROM cart_products cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = ?
    `, [cart.id]);

    return { userId, items };
  },

  // Add or update item in the user's cart
  addToCart: async (userId, productId, quantity) => {
    const db = await dbPromise;
  
    let cart = await db.get(
      `SELECT * FROM carts WHERE user_id = ? AND status = 'new'`,
      [userId]
    );
  
    if (!cart) {
      const now = new Date().toISOString().split('T')[0];
      try {
        await db.run(
          `INSERT INTO carts (user_id, status, created_at) VALUES (?, 'new', ?)`,
          [userId, now]
        );
      } catch (err) {
        console.warn("Insert cart failed:", err);
      }
  
      // Always try to fetch a cart regardless of insert result
      cart = await db.get(
        `SELECT * FROM carts WHERE user_id = ? AND status = 'new'`,
        [userId]
      );
  
      if (!cart) {
        // Final fallback: grab most recent cart regardless of status
        cart = await db.get(
          `SELECT * FROM carts WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
          [userId]
        );
      }
  
      if (!cart) throw new Error("Could not create or retrieve cart");
    }
  
    // Add or update the cart item
    const existing = await db.get(
      `SELECT * FROM cart_products WHERE cart_id = ? AND product_id = ?`,
      [cart.id, productId]
    );
  
    if (existing) {
      await db.run(
        `UPDATE cart_products SET quantity = ? WHERE cart_id = ? AND product_id = ?`,
        [quantity, cart.id, productId]
      );
    } else {
      await db.run(
        `INSERT INTO cart_products (cart_id, product_id, quantity) VALUES (?, ?, ?)`,
        [cart.id, productId, quantity]
      );
    }
  
    return { message: 'Product added to cart' };
  },
  
  

  // Remove a product from the cart
  removeFromCart: async (userId, productId) => {
    const db = await dbPromise;
    const cart = await db.get(`SELECT * FROM carts WHERE user_id = ? AND status = 'new'`, [userId]);
    if (!cart) return { message: 'No active cart found.' };

    await db.run(`DELETE FROM cart_products WHERE cart_id = ? AND product_id = ?`, [cart.id, productId]);
    return { message: 'Product removed from cart' };
  },

  // Finalize purchase by updating cart status
  checkoutCart: async (userId) => {
    const db = await dbPromise;
    const cart = await db.get(`SELECT * FROM carts WHERE user_id = ? AND status = 'new'`, [userId]);
    if (!cart) return { message: 'No cart to checkout.' };

    await db.run(`UPDATE carts SET status = 'purchased' WHERE id = ?`, [cart.id]);
    return { message: 'Checkout complete' };
  }
};

module.exports = CartModel;