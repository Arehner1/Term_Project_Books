const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());

// Load routes BEFORE static
app.use('/api/products', require('./routes/products'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/cart', require('./routes/cart'));

// Only serve static under a separate path
app.use(express.static(path.join(__dirname, 'public')));

// Root route just for server check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
