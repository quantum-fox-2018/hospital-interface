"use strict"
const fs = require('fs');
const fileName = './listOfEmployee.json';
const logInfo = './userLog.json';
const patients = './patient.json';

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  static readFileEmployee(path, callback) {
    fs.readFile(path, 'utf8', function (err, data) {
      let dataOfEmployee = JSON.parse(data);
      callback(dataOfEmployee);
    })
  }

  static writeFileEmployee(path, dataObj, cbWriteFile) {
    let dataStr = JSON.stringify(dataObj, null, 2)
    fs.writeFile(path, dataStr, function (err) {
      if (err) {
        cbWriteFile(err)
      } else {
        cbWriteFile('status message');
      }

    });
  }

  static addEmployee(name, password, position, cbAddEmployee) {
    Hospital.readFileEmployee(fileName, (dataEmployee) => {
      let objEmployee = new Employee(name, password, name, position);
      dataEmployee.push(objEmployee);

      Hospital.writeFileEmployee(fileName, dataEmployee, function (statusMessage) {
        let totalEmployee = dataEmployee.length;
        statusMessage = 'save data success'
        cbAddEmployee(statusMessage, objEmployee, totalEmployee)
      });
    });
  }

  static loginEmployee(username, password, cbLoginEmployee) {
    Hospital.readFileEmployee(fileName, function(dataLog) {
      let loggedUser;
      for (let i = 0; i < dataLog.length; i++) {
        if (dataLog[i].name === username && dataLog[i].password === password) {
          dataLog[i].status = true;
          loggedUser = dataLog[i];
          break;
        }
        if (dataLog[i].name !== username || dataLog[i].password !== password) {
          loggedUser = dataLog[i];
          break;
        }
      }
      Hospital.writeFileEmployee(logInfo, loggedUser, function (statusMessage) {
        statusMessage = 'logged in succesfully'
        cbLoginEmployee(statusMessage, loggedUser);
      });
    });
  }

}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, password, position, username) {
    this.name = name
    this.password = password
    this.position = position
    this.username = username
    this.status = false;
  }
}

module.exports = {
  Hospital,
  Patient,
  Employee
};