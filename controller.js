'use strict'
const fs = require('fs')
const {HospitalModel,PatientModel,EmployeeModel} = require('./model.js')
const {HospitalView,PatientView,EmployeeView} = require('./view.js')
let hospital = new HospitalModel

class HospitalController{
  constructor() {
  }
}

class PatientController{
  constructor() {
  }
  static readFile(callback){
    fs.readFile('./patient.json','UTF-8',(err,data)=>{
      callback(JSON.parse(data))
    })
  }

  static writeFile(data,callback){
    fs.writeFile('./patient.json',JSON.stringify(data),'UTF-8',(err)=>{
      if(err) callback(err)
      else{
        callback()
      }
    })
  }
  static addPatient(name, diagnosis) {
    let patient = new PatientModel(name, diagnosis)
    let arrPatient = []
    let counter=0
    let successAdd=false
    EmployeeController.readFile(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(getData[i].statusLogin===true && getData[i].position==='dokter'){
          counter++
        }
      }
      if(counter>0){
        successAdd=true
        PatientController.readFile(function(getPatient) {
          for (let i = 0; i < getPatient.length; i++) {
            arrPatient.push(getPatient[i])
          }
          patient.id=arrPatient.length+1
          arrPatient.push(patient)
          hospital.addPatient(arrPatient)
          PatientController.writeFile(arrPatient, function(err) {
            if (err) console.log(err)
            else {
              PatientView.showPatient(arrPatient.length, successAdd)
            }
          });
        })
      }
      else{
        PatientView.showPatient(arrPatient.length, successAdd)
      }
    })
  }

}

class EmployeeController{
  constructor() {
  }
  static readFile(callback){
    fs.readFile('./employee.json','UTF-8',(err,data)=>{
      callback(JSON.parse(data))
    })
  }

  static writeFile(data,callback){
    fs.writeFile('./employee.json',JSON.stringify(data),'UTF-8',(err)=>{
      if(err) callback(err)
      else{
        callback()
      }
    })
  }

  static registerEmployee(name,username,password,position){
    let employee = new EmployeeModel(name,username,password,position)
    let arrEmployee=[]
    let check=true
    EmployeeController.readFile(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(employee.username===getData[i].username){
          check=false
        }
        arrEmployee.push(getData[i])
      }
      if(check===true){
        arrEmployee.push(employee)
      }
      hospital.addEmployee(arrEmployee)
      EmployeeController.writeFile(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          EmployeeView.showEmployee(employee,arrEmployee.length,check)
        }
      });
    })
  }

  static loginEmployee(username,password){
    let check=false
    let arrEmployee=[]
    EmployeeController.readFile(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(username===getData[i].username && password===getData[i].password){
          check=true
          getData[i].statusLogin=true
          arrEmployee.push(getData[i])
        }
        else{
          getData[i].statusLogin=false
          arrEmployee.push(getData[i])
        }
      }

      EmployeeController.writeFile(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          EmployeeView.showLogin(username,check)
        }
      });
    })
  }

  static logoutEmployee(username){
    let arrEmployee=[]
    EmployeeController.readFile(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(username===getData[i].username){
          getData[i].statusLogin=false
        }
        arrEmployee.push(getData[i])
      }
      EmployeeController.writeFile(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          EmployeeView.showLogout()
        }
      });
    })
  }
}

module.exports = {
  HospitalController,PatientController,EmployeeController
}
