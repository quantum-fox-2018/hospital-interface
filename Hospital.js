const fs = require('fs')

class Hospital {
  constructor(name,location,employees) {
    this.name = name
    this.employees = employees
    this.patients = []
    this.location = location
  }

  addEmployee(input,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      let employee = {name:input.name,position:input.position,username:input.username,password:input.password}
      employeeData.push(employee)
      let max = employeeData.length
      let newFormat = JSON.stringify(employeeData,null,2)
      fs.writeFile('./employee.json',newFormat,(err)=>{
        if (err) throw err
        callback(employee,max)
      })
    })
  }

  login(input,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      let status = false
      for(let i=0; i<employeeData.length; i++){
        let current = employeeData[i]
        let back = employeeData[employeeData.length-1]
        if(employeeData[i].username==input[0] && employeeData[i].password==input[1]){
          employeeData[i] = back
          employeeData[employeeData.length-1] = current
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

  addPatient(input,callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      fs.readFile('./patient.json','utf8',(err,data)=>{
        let patientData = JSON.parse(data)
        let status = false
        let max = 0
        if(employeeData[employeeData.length-1].position=='Dokter'){
          max = patientData.length
          let patient = {id:max+1,name:input.name,diagnosis:input.diagnosis}
          patientData.push(patient)
          status = true
          let newFormat = JSON.stringify(patientData,null,2)
          fs.writeFile('./patient.json',newFormat,(err)=>{
            if (err) throw err
          })
        }
        callback(status,max)
      })
    })
  }

  logout(callback){
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      for(let i=0; i<employeeData.length; i++){
        let current = employeeData[i]
        let back = employeeData[employeeData.length-1]
        if(employeeData[i].position!=='Dokter'){
          employeeData[i] = back
          employeeData[employeeData.length-1] = current
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

module.exports = Hospital
