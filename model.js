const Employee = require('./employee.js')
const fs = require('fs')
const Patient = require('./patient.js')

class Model {
  static register(username, password, role){
    let employees = Model.readData('./employee.json')
    let employee = new Employee(username, role, username, password)
    employees.push(employee)
    Model.writeData('./employee.json', employees)
    let str = `save data success ${JSON.stringify(employee)}. Total employee : ${employees.length}`
    return str
  }

  static login(username, password){
    let employees = Model.readData('./employee.json')
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].username === username && employees[i].password === password) {
        employees[i].isLogin = true
        Model.writeData("./employee.json", employees)
        return `user ${username} logged in succesfully`
      }
    }
    return `username/password wrong`
  }

  static logout(){
    let employees = Model.readData('./employee.json')
    let status = false
     for (var i = 0; i < employees.length; i++) {
       if (employees[i].isLogin === true) {
         employees[i].isLogin = false
         Model.writeData("./employee.json", employees)
         return "logout succesfully"
       }
     }
     return "you need to login to logout"
  }

  static addPatient(nama, penyakitArr){
    //id, name, diagnosis
    let employees = Model.readData("employee.json")
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].isLogin === true) {
        if (employees[i].position === "dokter") {
          let id = 1
          let patients = Model.readData("patient.json")
          if (patients) {
            id = patients.length+1
          }
          let newPatient = new Patient(id, nama, penyakitArr)
          patients.push(newPatient)
          Model.writeData('./patient.json', patients)
          return `data pasien berhasil ditambahkan, total data pasien ${patients.length}`
        }else{
          return "tidak memiliki akses untuk add patient"
        }
      }
    }

  }

  static writeData(path, str){
    fs.writeFileSync(path, JSON.stringify(str), "utf8")
  }

  static readData(path){
    let str = fs.readFileSync(path, 'utf8');
    return JSON.parse(str);
  }
}

module.exports = Model
