var connection = require('./db.js');
var inquirer = require('inquirer');
var Table = require('easy-table');

var supervisor = {
  menuOptions: function() {
    inquirer.prompt([
      {
        type:'list',
        name:'menuOption',
        message:'Select an action',
        choices:['View Product Sales by Department','Create New Department','Sort Items','Quit'],
        default:'View Product Sales by Department'
      }
    ]).then(function(data){
      switch(data.menuOption){
        case 'View Product Sales by Department':
          supervisor.viewProductSales();
          break;
        case 'Create New Department':
          supervisor.createNewDept();
          break;
        case 'Sort Items':
          supervisor.sortItems();
          break;
        case 'Quit':
          supervisor.quit();
          break;
      }
    });
  },
  viewProductSales: function() {
    var query = connection.query(
      "SELECT department_id,departments.department_name AS dept_name,overhead_costs,SUM(products.product_sales) AS product_sales,SUM(products.product_sales)-departments.overhead_costs AS profit FROM products RIGHT JOIN departments ON products.department_name=departments.department_name GROUP BY departments.department_id",
      function(err,res){
        if(err) throw err;
        var t = new Table;
        res.forEach(function(product) {
          t.cell('Department Id', product.department_id);
          t.cell('Name', product.dept_name);
          t.cell('Overhead Costs($)', product.overhead_costs);
          t.cell('Total Department Revenue($)', product.product_sales);
          t.cell('Profit($)', product.profit);
          t.newRow();
        })
        console.log(t.toString());
        supervisor.menuOptions();
      }
    );
  },
  createNewDept: function() {
    inquirer.prompt([
      {
        name:'dept',
        message:'What is the department name? ',
        validate:function(value){
          return !(value==='');
        }
      },
      {
        name:'costs',
        message:'What are the overhead costs? ',
        validate:function(value){
          if(isNaN(value)===false)
            return true;
          return false;
        }
      }
    ]).then(function(data){
      supervisor.newDeptHelper(data);
    });
  },
  newDeptHelper: function(data){
    var query = connection.query(
      "INSERT INTO departments(department_name,overhead_costs) VALUES (?,?)",
      [data.dept,data.costs],
      function(err,res){
        if(err) throw err;
        supervisor.menuOptions();
      }
    );
  },
  sortItems: function() {
    var query = connection.query(
      "SELECT item_id FROM products WHERE department_name='To Be Sorted'",
      function(err,res){
        if(err) throw err;
        if(res.length !=0)
          supervisor.setDept(res[0].item_id);
        else{
          console.log('All Items Sorted');
          supervisor.menuOptions();
        }
      }
    );
  },
  setDept: function(id) {
    var query = connection.query(
      "SELECT product_name FROM products WHERE item_id=?",
      [id],
      function(err,res){
        if(err) throw err;
        var message = "What would you like to set the department of "+res[0].product_name+" to?";
        inquirer.prompt([
          {
            name:'dept',
            message:message,
            validate:function(value){
              return !(value==='');
            }
          }
        ]).then(function(data){
          supervisor.updateDept(data,id);
        });
      }
    )
  },
  updateDept: function(data,id) {
    var query = connection.query(
      "UPDATE products SET department_name=? WHERE item_id=?",
      [data.dept,id],
      function(err,res){
        if(err) throw err;
        supervisor.sortItems();
      }
    );
  },
  quit: function() {
    connection.end();
  }
}

module.exports = supervisor;
