/*jshint esversion:6*/
const Controller = require('./controller.js');
const argv = process.argv;

switch (argv[2]) {
  case 'register':
    Controller.registerData(argv[3], argv[4], argv[5], argv[6]);

    break;
  case 'login':
    Controller.loginEmployee(argv[3], argv[4]);

    break;
  case 'addPatient':
    Controller.dataPatient(argv[3], argv[4]);

    break;
  case 'logout':
    Controller.logoutEmployee();

    break;
}
