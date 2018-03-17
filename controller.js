var fs = require('fs');
var Hospital = require('./hospital.js')

class Controller {
  static getEmployee() {
    Hospital.getEmployee(function(employees) {
      View.getEmployee(employees)
    })
  }

  static addEmployee() {
    var addNew = Hospital.addEmployee(argv[3], argv[4], argv[5], argv[6], function(addNew) {
      View.addEmployee(addNew);
    });
  }

  static loginUser() {
    var userLogin = Hospital.loginUser(argv[3], argv[4], function(login) {
      View.userLogin(login);
    })
  }

  static getPatients() {
    Hospital.getPatientss(function(patients) {
      View.getPatients(patients)
    })
  }

  static addPatient() {
    var addNew = Hospital.addPatient(argv[3], argv.slice(4), function(addNew) {
      View.addPatient(addNew);
    });
  }

  static logoutUser() {
    var userLogout = Hospital.logoutUser(argv[3], function(userLogout) {
      View.logout(userLogout);
    })
  }
}

module.exports = Controller
