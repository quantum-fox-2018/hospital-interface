'use strict'
const fs = require('fs')
const HospitalModel = require('./hospitalModel.js')
const PatientModel = require('./patientModel.js')
const EmployeeModel = require('./employeeModel.js')

class Model{
  constructor(){

  }

  static readEmployee(callback){
    fs.readFile('./employee.json','UTF-8',(err,data)=>{
      callback(JSON.parse(data))
    })
  }

  static writeEmployee(data,callback){
    fs.writeFile('./employee.json',JSON.stringify(data),'UTF-8',(err)=>{
      if(err) callback(err)
      else{
        callback()
      }
    })
  }

  static registerEmployee(name,username,password,position,callback){
    let employee = new EmployeeModel(name,username,password,position)
    let arrEmployee=[]
    let check=true
    Model.readEmployee(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(employee.username===getData[i].username){
          check=false
        }
        arrEmployee.push(getData[i])
      }
      if(check===true){
        arrEmployee.push(employee)
      }
      let hospital = new HospitalModel()
      hospital.employees=arrEmployee
      Model.writeEmployee(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          callback(employee,arrEmployee.length,check)
        }
      });
    })
  }

  static loginEmployee(username,password,callback){
    let check=false
    let arrEmployee=[]
    Model.readEmployee(function(getData){
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

      Model.writeEmployee(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          callback(username,check)
        }
      });
    })
  }

  static logoutEmployee(username,callback){
    let arrEmployee=[]
    Model.readEmployee(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(username===getData[i].username){
          getData[i].statusLogin=false
        }
        arrEmployee.push(getData[i])
      }
      Model.writeEmployee(arrEmployee,function(err){
        if(err) console.log(err)
        else{
          callback()
        }
      });
    })
  }

  static readPatient(callback){
    fs.readFile('./patient.json','UTF-8',(err,data)=>{
      callback(JSON.parse(data))
    })
  }

  static writePatient(data,callback){
    fs.writeFile('./patient.json',JSON.stringify(data),'UTF-8',(err)=>{
      if(err) callback(err)
      else{
        callback()
      }
    })
  }

  static addPatient(name, diagnosis,callback) {
    let patient = new PatientModel(name, diagnosis)
    let arrPatient = []
    let counter=0
    let successAdd=false
    Model.readEmployee(function(getData){
      for (let i = 0; i < getData.length; i++) {
        if(getData[i].statusLogin===true && getData[i].position==='dokter'){
          counter++
        }
      }
      if(counter>0){
        successAdd=true
        Model.readPatient(function(getPatient) {
          for (let i = 0; i < getPatient.length; i++) {
            arrPatient.push(getPatient[i])
          }
          patient.id=arrPatient.length+1
          arrPatient.push(patient)
          let hospital = new HospitalModel()
          hospital.patients = arrPatient
          Model.writePatient(arrPatient, function(err) {
            if (err) console.log(err)
            else {
              callback(arrPatient.length, successAdd)
            }
          });
        })
      }
      else{
        callback(arrPatient.length, successAdd)
      }
    })
  }


}



module.exports = Model
