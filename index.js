var fs = require('fs')
var Controller = require('./controller.js')

var argv = process.argv
var task = argv[2];

if(task === 'list') {
  Controller.getEmployee(View.getEmployee);
} else if(task === 'register') {
  //Controller.addEmployee(argv[3], argv[4], argv[5], argv[6]);
  Controller.addEmployee(argv[3], argv[4], argv[5], argv[6], View.addEmployee);
} else if(task === 'login') {
  Controller.loginUser(argv[3], argv[4], View.userLogin);
} else if(task === 'addPatient') {
  Controller.addPatient(argv[3], argv.slice(4), View.addPatient);
} else if(task === 'logout') {
  Controller.logoutUser(argv[3], View.logout)
}
