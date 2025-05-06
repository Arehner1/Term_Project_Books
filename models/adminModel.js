const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tales_and_tomes.db');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT p.*, c.name AS category_name
            FROM products p
            JOIN categories c ON p.category_id = c.id
        `, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};


const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        const { name, description, category_id, price, image_url, status } = data;

        db.run(`
            UPDATE products
            SET name = ?, description = ?, category_id = ?, price = ?, image_url = ?, status = ?
            WHERE id = ?
        `, [name, description, category_id, price, image_url, status, id], function (err) {
            if (err) reject(err);
            else resolve({ message: "Product updated", changes: this.changes });
        });
    });
};

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { name, description, category_id, price, image_url, status } = data;

        db.run(`
            INSERT INTO products (name, description, category_id, price, image_url, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, DATE('now'))
        `, [name, description, category_id, price, image_url, status || 'featured'], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
        });
    });
};

const bulkUpload = (products) => {
  return Promise.all(products.map(product => {
      const { name, description, category_id, price, image_url, status } = product;

      if (!name || !description || !category_id || !price || !image_url) {
          console.warn("Skipping invalid product:", product);
          return Promise.resolve(null); // or throw, depending on your policy
      }

      return addProduct({
          name,
          description,
          category_id,
          price,
          image_url,
          status: status || "featured"
      });
  }));
};


const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
            if (err) reject(err);
            else resolve({ message: "Product deleted", changes: this.changes });
        });
    });
};

module.exports = {
    getAllProducts,
    updateProduct,
    addProduct,
    bulkUpload,
    deleteProduct
};
