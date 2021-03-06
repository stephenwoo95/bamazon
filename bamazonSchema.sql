CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT(7,2),
    stock_quantity INT,
    product_sales FLOAT(10,2) DEFAULT 0
);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100),
    overhead_costs FLOAT(10,2)
);

CREATE TABLE users(
	name VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100)
);