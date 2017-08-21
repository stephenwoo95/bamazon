USE bamazon;

INSERT INTO products(department_name,product_name,price,stock_quantity)
VALUES ('food', 'apples', 1.00, 1500),('food','bananas',0.50,2000),('electronics', 'MacBook Pro',1200.00,150),('electronics','iPod',200.00,100),('electronics','GoPro',400.00,75),('clothes','sweaters',20.00,1000),('clothes','pants',50.00,1000),('home goods','sponges',5.00,500),('home goods','toilet paper',1.00,10000),('home goods','dish soap',5.00,1000);

SELECT * FROM products;