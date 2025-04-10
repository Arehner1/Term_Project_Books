// In-memory cart object
let carts = {
    1: {
      userId: 1,
      items: [
        { productId: 101, title: "Sample Book A", quantity: 2, price: 19.99 },
        { productId: 102, title: "Sample Book B", quantity: 1, price: 9.99 }
      ]
    }
  };
  
  // Get a user's cart
  exports.getCart = (userId) => {
    if (!carts[userId]) {
      carts[userId] = { userId, items: [] };
    }
    return carts[userId];
  };
  
  // Add a product to a user's cart.
  exports.addToCart = (userId, productId, quantity) => {
    if (!carts[userId]) carts[userId] = { userId, items: [] };
  
    const cart = carts[userId];
    const existing = cart.items.find(item => item.productId === productId);
  
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        title: `Stub Product ${productId}`,
        price: 10.00,
        quantity
      });
    }
  
    return { message: 'Added to cart', cart };
  };
  
  // Remove a product from the user's cart
  exports.removeFromCart = (userId, productId) => {
    if (!carts[userId]) return { message: 'Cart empty' };
  
    carts[userId].items = carts[userId].items.filter(item => item.productId !== productId);
    return { message: 'Removed from cart', cart: carts[userId] };
  };
  
  // Checkout the user's cart
  exports.checkoutCart = (userId) => {
    carts[userId] = { userId, items: [] };
    return { message: 'Checkout complete', cart: carts[userId] };
  };
  