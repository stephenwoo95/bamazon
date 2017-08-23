# bamazon

This guide shows the flow of this CLI application

## Overview

This CLI app contains three different user modes: customer, manager, and supervisor. The customer mode allows a customer to buy items from a list of offered products, given that there is enough inventory. The manager mode allows the user to view all the products for sale, view those that have less than 10 units in stock, restock low inventory items, and add new products to the shelf. The supervisor mode allows the user to view the performance of each department, add a new department, and sort items which are in the 'To Be Sorted' department to a specific department (if a manager adds an item to the 'To Be Sorted' department).
    The manager and supervisor options are protected by a password which is stored using a SHA1 hash encryption, so the database manager cannot view the users' passwords. In this case however, the password values were chosen in advance, rather than allowing a user with clearance to create their own password.

## App Usage

### CLI.js home screen

To start the application, the user enters the directory of the application on their machine through the terminal and uses the 'node CLI.js' command to run the app.

![cli](Images/clihomescreen.png)

### Customer View

Customers are automatically given a table with all the items and their prices. If an item has too low inventory for the customer, they are alerted and redirected to pick a different item or amount. Otherwise, they are given their total price. At this point, the database is updated to reflect the change in inventory and product sales.

![c1](Images/customeroutofstock.png)
![c2](Images/customerbuyitem.png)

### Manager View

Managers must input a password, and then they are directed to their respective menu options screen. In this case, the password for manager is 'manager' and the password for supervisor is 'supervisor'. These strings are hashed by the SHA1 algorithm and stored in the database. The input string is also run through the SHA1 and compared against the value in the database.

![m1](Images/managerwrongpass.png)

![m2](Images/managermenu.png)

Users can then select one of the four options.

#### View Products

![m3](Images/manviewpro.png)

#### View Low inventory

![m4](Images/manlowinv.png)

#### Add inventory

![m5](Images/manaddinv.png)

#### Add Product

![mm](Images/manaddnewpick.png)

![m6](Images/manaddnew.png)

Managers can also add to the to be sorted department

![m7](Images/manaddsort.png)

### Supervisor View

Supervisors also require a password and to get to the menu screen.

![s1](Images/supmenu.png)

#### View By Department

![s2](Images/supviewbydept.png)

#### Add Department

![s3](Images/supadddept.png)

#### Sort Goods

![s4](Images/supsortno.png)

![s4](Images/supsort.png)

