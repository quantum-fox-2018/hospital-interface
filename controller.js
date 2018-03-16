const View = require('./view.js');
const Model = require('./model.js');

class Controller {
  static menu(input) {
    var command = input[2];
    var file_employee = './employee.json';
    var file_patient = './patient.json';

    if (command == 'register') {
      let objRegist = {
        name     : input[3],
        username : input[4],
        password : input[5],
        role     : input[6]
      };

      Model.register(file_employee, objRegist, viewData => {
        View.registerSuccess(viewData);
      });
    }

    if (command == 'login') {
      let objLogin = {
        username     : input[3],
        password     : input[4]
      };

      Model.login(file_employee, objLogin, viewData => {
         View.loginSuccess(viewData);
      });
    }

    if (command == 'logout') {
      let objLogout = {
        username    : input[3]
      };

      Model.logout(file_employee, objLogout, viewData => {
        View.logoutSuccess(viewData);
      })
    }

    if (command == 'addPatient') {
      let objPatient = {
        name        : input[3],
        diagnose    : input.slice(4).join(' ')
      };

      Model.addPatient(file_employee, file_patient, objPatient, viewData => {
        View.addPatientSucces(viewData);
      })
    }
  }

}

module.exports = Controller;
