const fs = require('fs');
const Employee = require('./employee.js');
const Patient = require('./patient.js');

class Model {
  static readData(file, callback) {
    fs.readFile(file, 'utf8', (err, rawData) => {
      let data = JSON.parse(rawData);
      callback(data);
    });
  }

  static writeData(file, data) {
    fs.writeFile(file, JSON.stringify(data, null, 2), err => {
    });
  }

  static register(file, objRegist, callback) {
    Model.readData(file, dataEmployee => {
      let newEmployee = new Employee(objRegist);
      dataEmployee.push(newEmployee);
      Model.writeData(file, dataEmployee);
      callback(dataEmployee);
    });
  }

  static addPatient(file_employee, file_patient, objPatient, callback) {
    Model.readData(file_employee, dataEmployee => {
      Model.readData(file_patient, dataPatient => {
        Model.validateAccess(dataEmployee, accessStatus => {
          let result;
          if (accessStatus) {
            let idPatient = dataPatient.length + 1;
            let newPatient = new Patient(idPatient, objPatient.name, objPatient.diagnose);
            dataPatient.push(newPatient);
            Model.writeData(file_patient, dataPatient);;
            result = `Successfully added patient data. Total patient data: ${dataPatient.length}`
          } else {
            result = `User don't have access to change patient data!`;
          }
          callback(result);
        })
      })
    })
  }

  static validateAccess(dataEmployee, callback) {
    let accessStatus = false;
    for (let i in dataEmployee) {
      if (dataEmployee[i].role == 'doctor'
        && dataEmployee[i].loginStatus == true) {
          accessStatus = true;
        }
    }
    callback(accessStatus);
  }

  static login(file, objLogin, callback) {
    Model.readData(file, dataEmployee => {
      Model.validateLogin(dataEmployee, objLogin, loginStatus => {
        let result;
        if (loginStatus == true) {
          Model.writeData(file, dataEmployee);
          result = `User ${objLogin.username} login successful!`;
        } else {
          result = `Login Failed! Wrong Username/Password!`;
        }
        callback(result);
      })
    });
  }

  static logout(file, objLogout, callback) {
    Model.readData(file, dataEmployee => {
      let result;
      for (let i in dataEmployee) {
        if (objLogout.username == dataEmployee[i].username
          && dataEmployee[i].loginStatus == true) {
            dataEmployee[i].loginStatus = false;
            Model.writeData(file, dataEmployee);
            result = `User ${dataEmployee[i].username} logout successful!`;
          } else {
            result = `User ${dataEmployee[i].username} logout failed!`;
          }
      }
      callback(result);
    })
  }

  static validateLogin(dataEmployee, objLogin, callback) {
    let loginStatus = false;
    for (let i in dataEmployee) {
      if (objLogin.username == dataEmployee[i].username
        && objLogin.password == dataEmployee[i].password) {
          loginStatus = true;
          dataEmployee[i].loginStatus = true;
        }
    }
    callback(loginStatus);
  }

}

module.exports = Model;
