var inquirer = require('inquirer');
var connection = require('./db.js');
var customer = require('./bamazonCustomer.js');
var manager = require('./bamazonManager.js');
var supervisor = require('./bamazonSupervisor.js');

function userChoice() {
  inquirer.prompt([
    {
      type:'list',
      name:'userType',
      message:'Select a user type',
      choices:['Customer','Manager','Supervisor'],
      default:'Customer'
    }
  ]).then(function(data){
    switch(data.userType){
      case 'Customer':
        customer.displayItems();
        break;
      case 'Manager':
        // userValidate('Manager');
        manager.menuOptions();
        break;
      case 'Supervisor':
        // userValidate('Supervisor');
        supervisor.menuOptions();
        break;
    }
  });
}

function userValidate(user) {
  inquirer.prompt([
  {
    name:'password',
    message:'Password: ',
  }
  ]).then(function(data){
    switch(user){
      case 'Manager':
        //check hash for data.password against manager info
        //if true, call menu options else call inquirer
        break;
      case 'Supervisor':
        //check hash for data.password against supervisor info
        break;
    }
  });
};

userChoice();
