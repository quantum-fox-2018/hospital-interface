const index = require('./index.js')
const Model = require('./model.js')
const View = require('./view.js');

class Controller {
  static getData(username, password, role, callback) {
    Model.registerEmployee(username, password, role, function(listDataEmployee) {
      View.showDataEmployee(username, password, role, listDataEmployee)
    })
  }

  static getFlag(username, password, callback) {
    Model.loginEmployee(username, password, function(loginStatus) {
      View.showLoginStatus(username, loginStatus)
    })
  }

  static patient(name, diagnosis, callback) {
    Model.addPatient(name, diagnosis, function(statusPatient) {
      View.successAdd(name, diagnosis)
    })
  }
}

module.exports = Controller;
