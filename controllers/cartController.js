// Get a specific user's cart
exports.getCart = (req, res) => {
    res.json({
      userId: req.params.userId,
      items: [
        { productId: 101, title: "Sample Book A", quantity: 2, price: 19.99 },
        { productId: 102, title: "Sample Book B", quantity: 1, price: 9.99 }
      ]
    });
  };
  
  // Stub for adding a product to a user's cart
  exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    res.json({
      message: `Stub: added ${quantity} of product ${productId} to cart for user ${req.params.userId}`
    });
  };
  
  // Stub for removing a product from a user's cart
  exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    res.json({
      message: `Stub: removed product ${productId} from cart for user ${req.params.userId}`
    });
  };
  
  // Stub for checking out a user's cart
  exports.checkoutCart = (req, res) => {
    res.json({
      message: `Stub: checked out cart for user ${req.params.userId}`
    });
  };
  