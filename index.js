const Controller = require('./controller.js');

var argv = process.argv;

var command = argv[2];
var name = argv[3];
var password = argv[4];
var role = argv [5];

if (command == 'register') {
  Controller.register(name, password, role);
}
