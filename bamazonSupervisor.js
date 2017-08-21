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
        choices:['View Product Sales by Deparment','Create New Department','Quit'],
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
        case 'Quit':
          supervisor.quit();
          break;
      }
    });
  },
  viewProductSales: function() {

  },
  createNewDept: function() {

  },
  quit: function() {
    connection.end();
  }
}

module.exports = supervisor;
