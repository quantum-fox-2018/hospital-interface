/*jshint esversion:6*/
const fs = require('fs');

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
    this.status = 'no access';
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Model {
  static bacaDataEmployee(callback) {
    fs.readFile('./employee.json', 'utf8', (err, dataEmployee) => {
      let listDataEmployee = JSON.parse(dataEmployee);
      callback(listDataEmployee);
    });
  }

  static bacaDataPatient(callback) {
    fs.readFile('./patient.json', 'utf8', (err, dataPatient) => {
      let listDataPatient = JSON.parse(dataPatient);
      callback(listDataPatient);
    });
  }

  static tambahDataEmployee(name, position, username, password, callback) {
    Model.bacaDataEmployee((dataEmployee) => {
      let listDataEmployee = dataEmployee;
      let newEmployee = new Employee(name, position, username, password);
      listDataEmployee.push(newEmployee);
      Model.tulisDataEmployee(listDataEmployee);
      callback(listDataEmployee);
    });
  }

  static tulisDataEmployee(listDataEmployee) {
    fs.writeFile('employee.json', JSON.stringify(listDataEmployee, null, 2), 'utf8', (err) => {});
  }

  static tulisDataPatient(listDataPatient) {
    fs.writeFile('patient.json', JSON.stringify(listDataPatient, null, 2), 'utf8', (err) => {});
  }


  static loginEmployee(username, password, callback) {
    Model.bacaDataEmployee((dataEmployee) => {
      let listDataRegister = dataEmployee;
      let usernameFound = false;
      for (let i = 0; i < listDataRegister.length; i++) {
        if (listDataRegister[i].username == username && listDataRegister[i].password == password) {
          listDataRegister[i].status = 'access';
          Model.tulisDataEmployee(listDataRegister);
          usernameFound = true;
          callback(usernameFound);
          break;
        }
      }
      if (usernameFound == false) {
        callback(usernameFound);
      }
    });
  }

  static tambahDataPatient(name, diagnosis, callback) {
    Model.bacaDataEmployee((dataEmployee) => {
      let listDataRegister = dataEmployee;
      let positionDokter = false;
      for (let i = 0; i < listDataRegister.length; i++) {
        if (listDataRegister[i].position.toLowerCase() == 'dokter' && listDataRegister[i].status == 'access') {
          positionDokter = true;
          break;
        }
      }
      if (positionDokter == true) {
        Model.bacaDataPatient((dataPatient) => {
          let listDataPatient = dataPatient;
          let id = listDataPatient.length + 1;
          let newDataPatient = new Patient(id, name, diagnosis);
          listDataPatient.push(newDataPatient);
          Model.tulisDataPatient(listDataPatient);
          callback(listDataPatient, positionDokter);
        });
      } else {
        callback(positionDokter);
      }
    });
  }

  static logoutEmployee(callback) {
    Model.bacaDataEmployee((dataEmployee) => {
      let listDataRegister = dataEmployee;
      let statusFound = false;
      for (let i = 0; i < listDataRegister.length; i++) {
        if (listDataRegister[i].status == 'access') {
          listDataRegister[i].status = 'no access';
          Model.tulisDataEmployee(listDataRegister);
          statusFound = true;
          callback(statusFound);
        }
      }
    });
  }
}

module.exports = Model;
