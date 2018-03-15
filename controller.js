const View = require('./view.js');
const {Hospital, Patient, Employee} = require('./model.js');

class Controller {
  static register(name, password, role) {
    let register = Employee.register(name, password, role);
  }
}

module.exports = Controller;
