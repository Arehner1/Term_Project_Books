const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tales_and_tomes.db');

// Get all products with optional filtering
const getAllProducts = (category = null, sort = null) => {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT products.*
            FROM products
            LEFT JOIN categories ON products.category_id = categories.id
        `;
        const params = [];

        if (category) {
            sql += ` WHERE LOWER(categories.name) = LOWER(?)`;
            params.push(category);
        }

        if (sort === 'name') {
            sql += ` ORDER BY products.name ASC`;
        } else if (sort === 'price') {
            sql += ` ORDER BY products.price ASC`;
        }

        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};


// Get a product by id
const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

module.exports = { getAllProducts, getProductById };
