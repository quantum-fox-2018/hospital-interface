const {Hospital} = require('./model')
const {View} = require('./view')
const fs = require('fs');


class Controller {
  constructor() {

  }

  static listEmployees(){
    Hospital.read(function (employees){
      View.listEmployees(employees)
      // console.log(employees);
    })
  }

  static listPatient(){
    Hospital.readPatient(View.listPatient)
  }

  static register(argvInput){
    let arrArgv = argvInput.split(",")
    // console.log(arrArgv);
    Hospital.register(arrArgv, View.register)
  }

  static login(argvLogin){
    let arrArgv = argvLogin.split(",")
    Hospital.login(arrArgv, View.login)
  }

  static addPatient(dataPatient){
    let argvPatient = dataPatient.split(",")
    Hospital.addPatient(argvPatient, View.addPatient)
  }
}
module.exports = {
  Controller
};
