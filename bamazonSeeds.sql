USE bamazon;

INSERT INTO products(department_name,product_name,price,stock_quantity)
VALUES ('food', 'apples', 1.00, 1500),('food','bananas',0.50,2000),('electronics', 'MacBook Pro',1200.00,150),('electronics','iPod',200.00,100),('electronics','GoPro',400.00,75),('clothes','sweaters',20.00,1000),('clothes','pants',50.00,1000),('home goods','sponges',5.00,500),('home goods','toilet paper',1.00,10000),('home goods','dish soap',5.00,1000);

SELECT * FROM products;

INSERT INTO departments(department_name,overhead_costs) 
VALUES ('food',3000),('electronics',2000),('clothes',1500),('home goods',850);

SELECT * FROM departments;

SELECT department_name,SUM(product_sales) FROM products
GROUP BY department_name;

SELECT department_id,departments.department_name,overhead_costs,
SUM(products.product_sales) AS product_sales,SUM(products.product_sales)-departments.overhead_costs AS profit
FROM products INNER JOIN departments
ON products.department_name=departments.department_name
GROUP BY departments.department_id;

