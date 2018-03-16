const fs = require('fs');
const controller = require('./controller.js');
let argv = process.argv

// console.log(argv);

class Model {
  constructor() {

  }
  static register(candidate, cb) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      let employees = data
      var arrEmployees = JSON.parse(employees);

      arrEmployees.push(candidate)
      // console.log(arrEmployees);

      fs.writeFile('./employee.json', JSON.stringify(arrEmployees, null, 2),'utf8', (err) => {
        if (err) throw err;
        // callback(arrEmployees)
        cb(arrEmployees.length, candidate)
        // console.log(`save data success ${candidate}. Total employee : ${arrEmployees.length}`);
      });
    })
  }

  static login(username, password, cb) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      let employees = data
      var arrEmployees = JSON.parse(employees);

      let statusLogin = false
      for (var i = 0; i < arrEmployees.length; i++) {
        if (arrEmployees[i].username == username) {
          if (arrEmployees[i].password == password) {
            arrEmployees[i].isloggedin = true
            fs.writeFile('./employee.json', JSON.stringify(arrEmployees, null, 2),'utf8', (err) => {
              if (err) throw err;
            });
            cb(arrEmployees[i].name, true)
            // console.log(`user ${arrEmployees[i].name} logged in successfully`);
            statusLogin = true
            break;
          }
        }
      }
      if (statusLogin === false) {
        cb(statusLogin, false)
        // console.log('username / password is wrong');
      }
    })
  }

  static addPatient(namaPasien, keluhan, cb) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      let employees = data
      var arrEmployees = JSON.parse(employees);

      let statusDokter = false
      for (var i = 0; i < arrEmployees.length; i++) {
        if (arrEmployees[i].role == 'dokter') {
          if (arrEmployees[i].isloggedin == true) {
            statusDokter = true
            break;
          }
        }
      }
      if (statusDokter == true) {
        fs.readFile('./patient.json', 'utf8', (err, data) => {
          let patients = data
          var arrPatients = JSON.parse(patients);

          let pasien = new Patient(arrPatients.length+1, namaPasien, keluhan)

          arrPatients.push(pasien)
          // callback(arrPatients.length)
          cb(arrPatients.length, true)
          // console.log(`data pasien berhasil ditambahkan. Total data pasien : ${arrPatients.length}`);

          fs.writeFile('./patient.json', JSON.stringify(arrPatients, null, 2),'utf8', (err) => {
            if (err) throw err;
          });
        })
        // let patient = new Patient()
      } else {
        cb(false, false)
        // console.log('tidak memiliki akses untuk add patient');
      }
    })
  }

  static logout(username, password, cb) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      let employees = data
      var arrEmployees = JSON.parse(employees);

      let statusLogin = true
      for (var i = 0; i < arrEmployees.length; i++) {
        if (arrEmployees[i].username == username) {
          if (arrEmployees[i].password == password) {
            if (arrEmployees[i].isloggedin == true) {
              arrEmployees[i].isloggedin = false
              fs.writeFile('./employee.json', JSON.stringify(arrEmployees, null, 2),'utf8', (err) => {
                if (err) throw err;
              });
              cb(arrEmployees[i].name)
              // console.log(`user ${arrEmployees[i].name} logged out successfully`);
              statusLogin = false
              break;
            } else {
              cb(false)
              // console.log('anda belum login, silahkan login terlebih dahulu');
              break;
            }
          }
        }
      }
      if (statusLogin === true) {
        cb(true)
        // console.log('username / password is wrong');
      }
    })
  }
}

// class Hospital {
//   constructor(name, location, employees, patients) {
//     this.name = name
//     this.employees = employees
//     this.patients = patients
//     this.location = location
//   }
// }

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.role = position
    this.username = username
    this.password = password
    this.isloggedin = false
  }
}

class Admin extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}
class OfficeBoy extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}

class Receptionist extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}

class Dokter extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}


// let model = new Model()

// if (argv[2] == 'register') {
//   if (argv[5] == 'admin') {
//     let candidateAdmin = new Admin(argv[3], argv[5], argv[3], argv[4])
//     model.register(candidateAdmin)
//   } else if (argv[5] == 'officeboy') {
//     let candidateOB = new OfficeBoy(argv[3], argv[5], argv[3], argv[4])
//     model.register(candidateOB)
//   } else if (argv[5] == 'receptionist') {
//     let candidateRec = new Receptionist(argv[3], argv[5], argv[3], argv[4])
//     model.register(candidateRec)
//   } else if (argv[5] == 'dokter') {
//     let candidateDok = new Dokter(argv[3], argv[5], argv[3], argv[4])
//     model.register(candidateDok)
//   }
// } else if (argv[2] == 'login') {
//   model.login(argv[3], argv[4])
// } else if (argv[2] == 'addPatient') {
//   let keluhan = ''
//   for (var i = 4; i < argv.length; i++) {
//     keluhan += argv[i]
//     if (i !== argv.length-1) {
//       keluhan += ' '
//     }
//   }
//   model.addPatient(argv[3], keluhan)
// } else if (argv[2] == 'logout') {
//   model.logout(argv[3], argv[4])
// }



module.exports = {Model, Admin, OfficeBoy, Receptionist, Dokter}
