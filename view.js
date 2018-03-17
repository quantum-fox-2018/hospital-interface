var fs = require('fs')

class View {
  static getEmployee(data) {
    console.log(data);
  }

  static addEmployee(newData) {
    console.log(newData);
  }

  static userLogin(login) {
    console.log(login);
  }

  static getPatients(patients) {
    console.log("--", patients);
  }

  static addPatient(newPatient) {
    console.log(newPatient);
  }

  static logout(logout) {
    console.log(logout);
  }
}

module.exports = View
