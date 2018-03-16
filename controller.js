'use strict'

const Model = require('./model.js')
const {HospitalView,PatientView,EmployeeView} = require('./view.js')

class HospitalController{
  constructor() {
  }
}

class PatientController{
  constructor() {
  }

  static addPatient(name, diagnosis) {
    Model.addPatient(name, diagnosis,PatientView.showPatient)
  }

}

class EmployeeController{
  constructor() {
  }


  static registerEmployee(name,username,password,position){
    Model.registerEmployee(name,username,password,position,EmployeeView.showEmployee)
  }

  static loginEmployee(username,password){
    Model.loginEmployee(username,password,EmployeeView.showLogin)
  }

  static logoutEmployee(username){
    Model.logoutEmployee(username,EmployeeView.showLogout)
  }
}

module.exports = {
  HospitalController,PatientController,EmployeeController
}
