const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tales_and_tomes.db');

// Get all products
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM products', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Get a product by id
const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

module.exports = { getAllProducts, getProductById };
