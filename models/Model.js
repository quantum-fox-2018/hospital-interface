const fs = require('fs')
const path = require('path')

const Hospital = require('./Hospital')
const Employee = require('./Employee')
const Patient = require('./Patient')

class Model {
  static readData(file, cb) {
    let file_path = path.join(__dirname, './', file)
    fs.readFile(file_path, 'utf8', function (err, data) {
      if(err) throw err;
      data = JSON.parse(data)
      cb(data)
    })
  }

  static writeData(file, newData) {
    let file_path = path.join(__dirname, './', file)
    let data = JSON.stringify(newData, null, 2)
    fs.writeFile(file_path, data, (err) =>{
      if(err) throw err
    })
  }

  static addEmployee(person, cb) {
    let file = 'employee.json'
    Model.readData(file, function(data) {
      let employee = new Employee({
        username: person[0],
        password: person[1],
        role: person[2],
        statusLogin: false
      })

      data.push(employee)
      Model.writeData(file, data)
      cb(`save data success ${JSON.stringify(employee)}. Total employee: ${data.length}`)
    })
  }

  

  static login(user, cb) {
    let file = 'employee.json'
    let status = 1
    Model.readData(file, function(data) {
      for(let i=0; i<data.length; i++) {
        if(data[i].username == user[0] && data[i].password == user[1] && data[i].statusLogin == false) {
          data[i].statusLogin = true
          Model.writeData(file, data)
          status = 2
        } else if(data[i].username == user[0] && data[i].password == user[1] && data[i].statusLogin == true) {
          status = 3
        }
      }
      cb(status, user[0])
    })
  }

  static logout(user, cb) {
    let file = 'employee.json'
    let status = 1
    Model.readData(file, function(data) {
      for(let i=0; i<data.length; i++) {
        if(data[i].username == user[0] && data[i].statusLogin == true) {
          data[i].statusLogin = false
          Model.writeData(file, data)
          status = 2
        } else if(data[i].username == user[0] && data[i].statusLogin == false) {
          status = 3
        }
      }
      cb(status, user[0])
    })
  }

  static checkDokter(cb) {
    let file = 'employee.json'
    let status = false
    Model.readData(file, function(data) {
      for(let i=0; i<data.length; i++) {
        if(data[i].role == 'dokter' && data[i].statusLogin == true) {
          status = true
        }
      }
      cb(status)
    })
  }

  static addPatient(person, cb) {
    Model.checkDokter(function(status) {
      if(status == true) {
        Model.addPatients(person, function(info){
          cb(info)
        })
      } else {
        cb('tidak memiliki akses untuk add patient')
      }
    })
  }

  static addPatients(person, cb) {
    let file = 'patient.json'
    Model.readData(file, function(data) {
      let patient = new Patient({
        id: (data.length + 1),
        name: person[1],
        diagnosis: person.splice(2)
      })

      data.push(patient)
      Model.writeData(file, data)
      cb(`data pasient berhasil ditambahkan. Total data patien: ${data.length}`)
    })
  }

}

module.exports = Model