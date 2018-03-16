const Employee = require('./employee.js')
const fs = require('fs')
const Patient = require('./patient.js')

class Model {

  static displayEmployee(callback){
    Model.readData('./employee.json', function(data){
      callback(data)
    })
  }

  static displayPatient(callback){
    Model.readData('./patient.json', function(data){
      callback(data)
    })
  }

  static register(command, callback){
    let username = command[0]
    let password = command[1]
    let role = command[2]
    Model.readData('./employee.json', function(employees){
      let employee = new Employee(username, role, username, password)
      employees.push(employee)
      let str = `save data success ${JSON.stringify(employee)}. Total employee : ${employees.length}`
      callback(str)
      Model.writeData('./employee.json', employees)
    })
  }

  static login(command, callback){
    let username = command[0]
    let password = command[1]
    Model.readData('./employee.json', function(employees){
      let str = "username/password wrong"
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].isLogin === true) {
          str = "logout first"
          i = employees.length
        }
      }
      if (str !== "logout first") {
        for (var i = 0; i < employees.length; i++) {
          if (employees[i].username === username && employees[i].password === password) {
            employees[i].isLogin = true
            str = `user ${username} logged in succesfully`
            i = employees.length
          }
        }
      }

      callback(str)
      Model.writeData('./employee.json', employees)
    })
  }

  static logout(callback){
    Model.readData('./employee.json', function(employees){
      let status = false
      let str = "you need to login to logout"

      for (var i = 0; i < employees.length; i++) {
       if (employees[i].isLogin === true) {
         employees[i].isLogin = false
         Model.writeData("./employee.json", employees)
         str = "logout succesfully"
        }
      }
       callback(str)
    })

  }

  static addPatient(command, callback){
    let nama = command[3]
    let penyakitArr = []
    for (var i = 4; i < command.length; i++) {
      penyakitArr.push(command[i])
    }
    Model.readData('./employee.json', function(employees){
      let str = "tidak memiliki akses untuk add patient"
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].isLogin === true) {
          if (employees[i].position === "dokter") {
            let id = 1
            let patients = []
            Model.readData("patient.json", function(data){
              patients = data
              if (patients) {
                id = patients.length+1
              }
              let newPatient = new Patient(id, nama, penyakitArr)
              patients.push(newPatient)
              str = `data pasien berhasil ditambahkan, total data pasien ${patients.length}`
              callback(str)
              Model.writeData('./patient.json', patients)
            })
          }
        }
      }
    })
  }

  static status(callback){
    Model.readData('./employee.json', function(employees){
      let str = "belum login, login terlebih dahulu"
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].isLogin === true) {
          str = `login account : ${employees[i].username}`
          i = employees.length
        }
      }
      callback(str)
    })
  }

  static writeData(path, str){
    fs.writeFile(path, JSON.stringify(str), "utf8", function(err){

    })
  }

  static readData(path, callback){
    let str = fs.readFile(path, 'utf8', function(err, data){
      callback(JSON.parse(data))
    });
  }
}

module.exports = Model
