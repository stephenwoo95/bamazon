var connection = require('./db.js');
var inquirer = require('inquirer');
var Table = require('easy-table');

var customer = {
  displayItems: function() {
    var query = connection.query(
      "SELECT item_id,product_name,price FROM products",
  		function(err, res) {
        if(err) throw err;
        var t = new Table;
        res.forEach(function(product) {
          t.cell('Item Id', product.item_id);
          t.cell('Name', product.product_name);
          t.cell('Price($)', product.price);
          t.newRow();
        })
        console.log(t.toString());
        customer.askCustomer();
  		}
  	);
  },
  askCustomer: function() {
    inquirer.prompt([
    {
      name:'id',
      message:'What is the id of the product you would like to buy? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    },
    {
      name:'amt',
      message:'How much would you like to buy? ',
      validate:function(value){
        if(isNaN(value)===false)
          return true;
        return false;
      }
    }
    ]).then(function(data){
      customer.checkStock(data.id,data.amt);
    });
  },
  checkStock: function(id,amt) {
    var query = connection.query(
      "SELECT stock_quantity FROM products WHERE item_id = ?",
      [id],
      function(err,res) {
        if(err) throw err;
        if(parseInt(res[0].stock_quantity) > parseInt(amt)){
          var updatedStock = parseInt(res[0].stock_quantity) - parseInt(amt);
          customer.updateStock(id,updatedStock,amt);
        }
        else
          console.log('Insufficient quantity!');
      }
    );
  },
  updateStock: function(id,updated,amt) {
    var query = connection.query(
      "UPDATE products SET stock_quantity=? WHERE item_id=?",
      [updated,id],
      function(err,res){
        if(err) throw err;
        customer.checkout(id,amt);
      }
    );
  },
  checkout: function(id,amt) {
    var query = connection.query(
      "SELECT price FROM products WHERE item_id=?",
      [id],
      function(err,res) {
        if(err) throw err;
        var total = parseInt(res[0].price)*parseInt(amt);
        console.log('Checkout Total: $' + total);
        connection.end();
      }
    );
  }
}

module.exports = customer;
