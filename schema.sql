DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  department_name varchar(255) NOT NULL,
  price float NOT NULL,
  stock_quantity int(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Toilet Paper', 'Bathroom Articles', 20, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('TV', 'Electronics', 800, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Shoes', 'Apparel', 70, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Hand-Soap', 'Bathroom Articles', 3, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('T-Shirt', 'Apparel', 15, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Vaccuum', 'Appliances', 55, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Legos', 'Toys', 40, 20);