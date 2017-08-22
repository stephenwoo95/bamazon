var inquirer = require('inquirer');
var sha1 = require('sha1');
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
        userValidate('Manager');
        break;
      case 'Supervisor':
        userValidate('Supervisor');
        break;
    }
  });
}

function userValidate(user) {
  inquirer.prompt([
  {
    type:'password',
    name:'password',
    message:'Password: ',
  }
  ]).then(function(data){
      var query = connection.query(
          "SELECT password FROM users WHERE name = ?",
          [user],
          function(err,res){
            if(err) throw err;
            if(sha1(data.password)==res[0].password){
              if(user=='Manager')
                manager.menuOptions();
              else
                supervisor.menuOptions();
            }else{
              console.log('Incorrect Password');
              userChoice();
            }
          }
        );
  });
};

userChoice();
