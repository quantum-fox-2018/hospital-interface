const Controller = require('./controller.js');

const argv = process.argv;
var input1 = argv[2];

if (input1 == 'register') {
  var username = argv[3];
  var password = argv[4];
  var role = argv[5];
  Controller.getData(username, password, role)
} else if (input1 == 'login') {
  var username = argv[3];
  var password = argv[4];
  Controller.getFlag(username, password)
} else if (input1 == 'addPatient') {
  var name = argv[3];
  var diagnosis = argv[4];
  Controller.patient(name, diagnosis)
}
