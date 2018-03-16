const fs = require('fs')

const Employee = require('./Employee.js')
const Patient = require('./Patient.js')
const Hospital = require('./Hospital.js')

class Model {
  static employeeList(callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      callback(employeeData)
    })
  }

  static addEmployee(input,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      let newEmployee = new Employee(input[0],input[1],input[2],input[3])
      let employee = {
        id:employeeData.length+1,
        name:newEmployee.name,
        position:newEmployee.position,
        username:newEmployee.username,
        password:newEmployee.password,
        status:newEmployee.status
      }
      employeeData.push(employee)
      let max = employeeData.length
      let newFormat = JSON.stringify(employeeData,null,2)
      fs.writeFile('./employee.json',newFormat,(err)=>{
        if (err) throw err
        callback(employee,max)
      })
    })
  }

  static login(input,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      let status = false
      for(let i=0; i<employeeData.length; i++){
        if(employeeData[i].username==input[0] && employeeData[i].password==input[1]){
          employeeData[i].status = true
          status = true
        }
      }
      let newFormat = JSON.stringify(employeeData,null,2)
      fs.writeFile('./employee.json',newFormat,(err)=>{
        if (err) throw err
        callback(status,input[0])
      })
    })
  }

  static addPatient(input,disease,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      fs.readFile('./patient.json','utf8',(err,data)=>{
        let patientData = JSON.parse(data)
        let status = false
        let max = 0
        for(let i=0; i<employeeData.length; i++){
          if(employeeData[i].status == true && employeeData[i].position=='Dokter'){
            let newPatient = new Patient(input[0],disease)
            let patient = {id:patientData.length+1,name:newPatient.name,
              diagnosis:newPatient.diagnosis}
            patientData.push(patient)
            max = patientData.length
            status = true
            let newFormat = JSON.stringify(patientData,null,2)
            fs.writeFile('./patient.json',newFormat,(err)=>{
              if (err) throw err
            })
          }
        }
        callback(status,max)
      })
    })
  }

  static logout(callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      for(let i=0; i<employeeData.length; i++){
        if(employeeData[i].status==true){
          employeeData[i].status = false
        }
      }
      let newFormat = JSON.stringify(employeeData,null,2)
      fs.writeFile('./employee.json',newFormat,(err)=>{
        if (err) throw err
        callback()
      })
    })
  }
}

module.exports = Model
