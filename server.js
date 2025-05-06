const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------- Controllers ----------------------
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const adminController = require('./controllers/adminController');

// ---------------------- Product API ----------------------
app.get('/api/products', productController.getAllProducts);
// Optional: for viewing product details
app.get('/api/products/:id', productController.getProductById);

// ---------------------- Cart API (default user ID: 1) ----------------------
app.get('/api/cart/:userId', cartController.getCart);
app.post('/api/cart/:userId/add', cartController.addToCart);
app.post('/api/cart/:userId/remove', cartController.removeFromCart);
app.post('/api/cart/:userId/checkout', cartController.checkoutCart);

// ---------------------- Admin API ----------------------
app.put('/api/products/:id', adminController.updateProduct);        
app.post('/api/products', adminController.addProduct);             
app.post('/api/products/bulk', adminController.bulkUpload); 
app.delete('/api/products/:id', adminController.deleteProduct);

// ---------------------- Root & Error ----------------------
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
