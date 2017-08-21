CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT(7,2),
    stock_quantity INT
);