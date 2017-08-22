var connection = require('./db.js');
var inquirer = require('inquirer');
var Table = require('easy-table');

var manager = {
  menuOptions: function() {
    inquirer.prompt([
      {
        type:'list',
        name:'menuOption',
        message:'Select an action',
        choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','Quit'],
        default:'View Products for Sale'
      }
    ]).then(function(data){
      switch(data.menuOption){
        case 'View Products for Sale':
          manager.viewProducts();
          break;
        case 'View Low Inventory':
          manager.viewLow();
          break;
        case 'Add to Inventory':
          manager.restock();
          break;
        case 'Add New Product':
          manager.grabDepts();
          break;
        case 'Quit':
          manager.quit();
          break;
      }
    });
  },
  viewProducts: function() {
    var query = connection.query(
      "SELECT * FROM products",
  		function(err, res) {
        if(err) throw err;
        var t = new Table;
        res.forEach(function(product) {
          t.cell('Item Id', product.item_id);
          t.cell('Name', product.product_name);
          t.cell('Price($)', product.price);
          t.cell('Stock Quantity', product.stock_quantity);
          t.newRow();
        })
        console.log(t.toString());
        manager.menuOptions();
  		}
  	);
  },
  viewLow: function() {
    var query = connection.query(
      "SELECT item_id,product_name,stock_quantity FROM products HAVING stock_quantity<10",
      function(err,res) {
        if(err) throw err;
        var t = new Table;
        res.forEach(function(product) {
          t.cell('Item Id', product.item_id);
          t.cell('Name', product.product_name);
          t.cell('Stock Quantity', product.stock_quantity);
          t.newRow();
        })
        var table = t.toString();
        if(t !== '')
          console.log(table);
        else
          console.log('No Low Inventory!');
        manager.menuOptions();
      }
    );
  },
  restock: function() {
    inquirer.prompt([
    {
      name:'id',
      message:'What is the id of the product you would like to restock? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    },
    {
      name:'amt',
      message:'How much would you like to add to the inventory? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    }
    ]).then(function(data){
      manager.restockHelper(data.id,data.amt);
    });
  },
  restockHelper: function(id,amt) {
    var query = connection.query(
      "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
      [amt,id],
      function(err,res){
        if(err) throw err;
        console.log(amt + ' units added to item ' + id);
        manager.menuOptions();
      }
    );
  },
  grabDepts: function() {
    var query = connection.query(
      "SELECT department_name FROM departments",
      function(err,res){
        if(err) throw err;
        var depts = [];
        for(i=0;i<res.length;i++){
          depts.push(res[i].department_name);
        }
        manager.addNewItem(depts);
      }
    );
  },
  addNewItem: function(depts) {
    depts.push('To Be Sorted');
    inquirer.prompt([
    {
      type:'list',
      name:'dept',
      message:'Which department will this item be placed in?',
      choices: depts
    },
    {
      name:'name',
      message:'What is the name of the item?'
    },
    {
      name:'price',
      message:'What is the price point? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    },
    {
      name:'amt',
      message:'How much would you like to add to the inventory? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    }
    ]).then(function(data){
      manager.addNewHelper(data);
    });
  },
  addNewHelper: function(data){
    var query = connection.query(
      "INSERT INTO products(department_name,product_name,price,stock_quantity) VALUES (?,?,?,?)",
      [data.dept,data.name,data.price,data.amt],
      function(err,res){
        if(err) throw err;
        console.log(data.amt + ' units of ' + data.name + ' added to the ' + data.dept + ' department with a price of ' + '$' + data.price + '.');
        manager.menuOptions();
      }
    )
  },
  quit: function() {
    connection.end();
  }
}

module.exports = manager;
