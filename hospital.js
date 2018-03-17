var fs = require('fs')
var Controller = require('./controller.js')

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  static getEmployee(cb) {
    fs.readFile('./employee.json', 'utf8', function(err, data) {
      var parsedData = JSON.parse(data)
      cb(parsedData);
    })
  }

  static addEmployee(param_name, param_position, param_username, param_password, cb) {
    this.getEmployee(function(data) {
      var employee = new Employee(param_name, param_position, param_username, param_password);
      data.push(employee);
      fs.writeFile('./employee.json', JSON.stringify(data), 'utf8', function(err) {
        cb(data);
      });
    });
  }

  static loginUser(employeeName, employeePassword, cb) {
    // var listJSON = JSON.parse(fs.readFileSync('./employee.json', 'utf8'));
    this.getEmployee(function(data) {
      var statusLogin;
      for(var i = 0; i < data.length; i++) {
        if(employeeName == data[i].username && employeePassword == data[i].password) {
          data[i].loginStat = true;
          fs.writeFile('./employee.json', JSON.stringify(data), 'utf8', function(err) {
            cb(data);
          });
          statusLogin = true;
          cb('user ' + data[i].name + ' logged in successfully');
        }
      }
      if(statusLogin === false) {
        cb('username / password salah')
      }
    });
  }

  static getPatientss(cb) {
    fs.readFile('./patient.json', 'utf8', function(err, data) {
      var parsedData = JSON.parse(data)
      cb(parsedData);
    })
  }

  static addPatient(patientName, diagnosis, cb) {
    this.getEmployee(function(data) {
      for(var i = 0; i < data.length; i++) {
        if(data[i].position == 'dokter' && data[i].loginStat == true) {
          Hospital.getPatientss(function(patientData) {
            var patientId = patientData.length + 1;
            var patient = new Patient(patientId, patientName, diagnosis);
            patientData.push(patient);
            fs.writeFile('./patient.json', JSON.stringify(patientData), 'utf8', function(err) {
              cb(patientData);
            });
          })
        }
      }
      cb('tidak ada akses')
    });
  }

  static logoutUser(userName, cb) {
    this.getEmployee(function(data) {
      for(var i = 0; i < data.length; i++) {
        if(userName === data[i].username) {
          data[i].loginStat = false;
          fs.writeFile('./employee.json', JSON.stringify(data), 'utf8', function(err) {
            cb(data);
          });
        }
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.loginStat = false;
  }
}

module.exports = Hospital
