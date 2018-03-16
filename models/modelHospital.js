const fs = require('fs')
const data = fs.readFileSync('./employee.json', 'utf8');

const Employee = require('../models/modelEmployee')


class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location 
  }

  static listEmployee(callback){
    let dataEmploye = JSON.parse(data)

    callback(dataEmploye)
  }

  static registerEmployee(username, password, role, callback){
    let dataEmploye = JSON.parse(data)
    
    let newEMploye = new Employee('', role, username, password)

    dataEmploye.push(newEMploye)

    let newData = JSON.stringify(dataEmploye, null, 2)

    fs.writeFileSync('./employee.json', newData)

    callback(newEMploye, dataEmploye.length)
  }

  static login(username, password, callback){
    const data = fs.readFileSync('./employee.json', 'utf8');
    let dataEmploye = JSON.parse(data)
    let statusLogin;
    for(let i=0; i<dataEmploye.length; i++){
      if(dataEmploye[i].username == username && dataEmploye[i].password == password){
        return callback(true, dataEmploye[i].username)
      }
    }
    return callback(false)
  }
}
  
module.exports = Hospital;