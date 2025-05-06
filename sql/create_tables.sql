CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    image_url VARCHAR(200),
    price INTEGER NOT NULL CHECK (price >= 0),
    status VARCHAR(20),
    created_at DATE NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('new', 'abandoned', 'purchased')),
    user_id INTEGER NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);