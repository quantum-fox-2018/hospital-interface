// const controller = require('./controller.js');
const fs = require('fs');

class Model {
  static registerEmployee(username, password, role, callback) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      var listData = JSON.parse(data);
      var listDataEmployee = listData;
      var newEmployee = new Employee(username, password, role);
      listDataEmployee.push(newEmployee);
      fs.writeFile('employee.json', JSON.stringify(listDataEmployee, null, 2), 'utf8', function(err) {

      })
      callback(listDataEmployee);
    })
  }

  static loginEmployee(username, password, callback) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      var flag = false;
      var listData = JSON.parse(data);
      for (var i = 0; i < listData.length; i++) {
        if (listData[i].username == username && listData[i].password == password) {
          listData[i].loginAccess = true;
          fs.writeFile('employee.json', JSON.stringify(listData, null, 2), 'utf8', function(err) {

          })
          flag = true;
          // callback(flag)
        }
      }
      callback(flag)
    })
  }

  static addPatient(name, diagnosis, callback) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      var flag = false;
      var listData = JSON.parse(data);
      for (var i = 0; i < listData.length; i++) {
        if (listData[i].role == 'dokter' && listData[i].loginAccess == true) {
          flag = true;
        }
        console.log(flag)
      }
      callback(flag);
      if (flag == true) {
        fs.readFile('patient.json', 'utf8', (err, data) => {
          var listData = JSON.parse(data);
          var id = listData.length + 1;
          var patient = new Patient(id, name, diagnosis)
          listData.push(patient);
          fs.writeFile('patient.json', JSON.stringify(listData, null, 2), 'utf8', function(err) {

          })
        })
      }
    })
  }
}
// Model.registerEmployee()

class Employee {
  constructor(username, password, role, loginAccess) {
    this.username = username
    this.password = password
    this.role = role;
    this.loginAccess = false;
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}


module.exports = Model;
