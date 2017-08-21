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
          manager.addNewItem();
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

  },
  restock: function() {

  },
  addNewItem: function() {

  },
  quit: function() {
    connection.end();
  }
}

module.exports = manager;
