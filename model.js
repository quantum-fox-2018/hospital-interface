const fs = require('fs');
const Employee = require('./employee.js');

class Model {
  static readData(file, callback) {
    fs.readFile(file, 'utf8', (err, rawData) => {
      let dataEmployee = JSON.parse(rawData);
      callback(dataEmployee);
    });
  }

  static writeData(file, dataEmployee) {
    fs.writeFile(file, JSON.stringify(dataEmployee, null, 2), err => {
    });
  }

  static register(file, objRegist, callback) {
    Model.readData(file, dataEmployee => {
      let newEmployee = new Employee(objRegist);
      dataEmployee.push(newEmployee);
      Model.writeData(file, dataEmployee);
      callback(newEmployee);
    });
  }

  static login(file, objLogin, callback) {
    Model.validateLogin(file, objLogin, loginStatus => {
      let result;
      if (loginStatus == true) {
        result = 'Login Successful!';
      } else {
        result = 'Login Failed! Wrong Username/Password!';
      }
      callback(result);
    })
  }

  static validateLogin(file, objLogin, callback) {
    let loginStatus = false;
    Model.readData(file, dataEmployee => {
      for (let i in dataEmployee) {
        if (objLogin.username == dataEmployee[i].username
          && objLogin.password == dataEmployee[i].password) {
            loginStatus = true;
            dataEmployee[i].loginStatus = true;
            Model.writeData(file, dataEmployee)
          }
      }
      callback(loginStatus);
    });
  }

}

module.exports = Model;
