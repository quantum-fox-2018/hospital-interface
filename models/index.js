const fs = require('fs');


const ModelPatient = require('./model_patient')
const ModelEmployee = require('./model_employee')
const ModelHospital = require('./model_hospital')
const file_login = './data_login.json'
const file_employee = './employee.json'
const file_patient = './patient.json'

class Models{
    constructor() {
        
    }

    static registerEmployee(username, password, position, callback){
        fs.readFile(file_employee, (err, data) => {
            if(err){
                console.log(err)
            }
            let employee_data = JSON.parse(data)
            // console.log(employee_data)
            let newEmployee = new ModelEmployee(username, position, username, password)
            employee_data.push(newEmployee)
            // console.log(newEmployee)

            fs.writeFile(file_employee, JSON.stringify(employee_data, null, 2), (err) => {
                if(err){
                    console.log(err)
                }
                callback(newEmployee, employee_data.length)
            })
        })
    }

    static checkLogin(username, password, callback){
        fs.readFile(file_employee, (err, data) => {
            if(err){
                console.log(err)
            }
            let employee_data = JSON.parse(data)
            let status = false
            let dataLogin = []
            for(let i=0; i<employee_data.length; i++){
                if(employee_data[i].username == username && employee_data[i].password == password){
                    status = true
                    dataLogin.push(employee_data[i])
                    callback(status, username)
                }
            }
            if(status == false){
                callback(status)
            }
            fs.writeFile(file_login, JSON.stringify(dataLogin, null, 2),(err, data) => {
                if(err){
                    console.log(err)
                }
            })
        })
    }

    static logout(){
        let empty = []
        fs.writeFile(file_login, JSON.stringify(empty), (err,data) => {
            if(err){
                console.log(err)
            }
            console.log('Has been logout')
        })
    }


    static addPatient(name, diagnosis, callback){
        fs.readFile(file_patient, (err, dataPatient) => {
          if(err){
            console.log(err)
          }
          let patient_data = JSON.parse(dataPatient)
          // console.log(patient_data)
          fs.readFile(file_login, (err, dataLogin) => {
            if(err){
              console.log(err)
            }
            let login_data = JSON.parse(dataLogin)
            // console.log(login_data)
            if(login_data.length == 0){
              console.log('silakan login dulu dong!!')
            }
            for(let i=0; i<login_data.length; i++){
              if(login_data[i].position == 'dokter'){
                let idPatient = patient_data.length+1
                let objPatient = new ModelPatient(idPatient, name, diagnosis)
                patient_data.push(objPatient)
                // console.log(patient_data)
  
                fs.writeFile(file_patient, JSON.stringify(patient_data, null, 2), (err) =>{
                  if(err){
                    console.log(err)
                  }
                  callback(objPatient)
  
                })
              } else {
                console.log(`Anda bukan dokter...Jadi dokter dulu dooooong!! \nPanggil dokternya untuk login.`)
              }
  
            }
          })
        })
      }

      static hospitalInfo(name, address, callback){
          fs.readFile(file_employee, (err, dataEmployee) => {
              if(err){
                  console.log(err)
              }
              let employee_data =  JSON.parse(dataEmployee)
              var employees = []
              for(let i=0; i<employee_data.length; i++){
                employees.push(employee_data[i].name)
              }

              fs.readFile(file_patient, (err, dataPatient) => {
                  if(err){
                      console.log(err)
                  }
                  let patient_data = JSON.parse(dataPatient)
                  var patients = []
                  for(let j=0; j<patient_data.length; j++){
                      patients.push(patient_data[j].name)
                  }
                  let hospital = new ModelHospital(name, address, employees, patients)
                  console.log(hospital)
                  console.log('============')
                  callback(hospital)
              })
              
          })
          
      }

}

module.exports = Models