/*jshint esversion:6*/
const Controller = require('./controller.js');
var argv = process.argv;


switch (argv[2]) {
  case 'register': Controller.registerData(argv[3], argv[4], argv[5], argv[6]);

    break;
  default:

}
