/*jshint esversion:6*/

const Model = require('./model.js');
const View = require('./view.js');


class Controller {
  static registerData(name, position, username, password) {
    Model.tambahDataEmployee(name, position, username, password, (listDataEmployee) => {
      let listDataLength = listDataEmployee.length;
      View.registerView(name, position, username, password, listDataLength);
    });
  }
  static loginEmployee(username, password) {
    Model.loginEmployee(username, password, (loginEmployee) => {
      let loginCondition = loginEmployee;
      View.loginEmployeeView(loginCondition, username);
    });
  }
  static dataPatient(name, diagnosis) {
    Model.tambahDataPatient(name, diagnosis, (listDataPatient, positionDokter) => {
      let listDataPatientLength = listDataPatient.length;
      let loginCondition = positionDokter;
      View.dataPatientView(listDataPatientLength, loginCondition);
    });
  }
  static logoutEmployee() {
    Model.logoutEmployee((logoutEmployee) => {
      let logoutCondition = logoutEmployee;
      View.logoutEmployeeView(logoutCondition);
    });
  }
}

module.exports = Controller;
