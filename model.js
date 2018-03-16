const fs = require('fs')
let argv = process.argv

class Model {

    static getData (cb) {

        fs.readFile("./employe.json", (err, data) => {

            if(err) throw err

            let listData = JSON.parse(data)
            cb(listData)
        })
    }

    static getPatient (cb) {

        fs.readFile("./patient.json", (err, data) =>{

            if(err) throw err

            let listPatient = JSON.parse(data)
            cb(listPatient)
        })
    }

    static addData (name, position, password, cb) {

                Model.getData(function(listData){
                let employee = new Employee(name, position, name, password)
                
                listData.push(employee)
                let totalEmployees = listData.length
                listData = JSON.stringify(listData, null,2)

                fs.writeFile('./employe.json',listData, (err) => {

                if (err) throw err;
                cb('Save data success ' + name + ' total employees ' + totalEmployees)
            })

        })  
    }

    static login (name, password, cb) {

        Model.getData(function(listData){

            for (let i = 0; i < listData.length; i++) {
                if(name === listData[i].name) {
                    if(password === listData[i].password) {
                        listData[i].status = false
                        listData = JSON.stringify(listData, null,2)

                        fs.writeFile('./employe.json',listData,(err) =>{
                            if (err) throw err;
                            cb('User' + listData[i].name + 'log in successfully')
                            
                        })

                    }
                }
            }
            
        }) 
    }

    static addPatient (id, name, diagnosis) {

        Model.getPatient(function(listPatien){

            let patients = new Patient(id,name,diagnosis)

            listPatient.push(patients)
            listPatient = JSON.stringify(listPatient,null,2)

            fs.writeFile('./patient.json',listPatient, (err) =>{

                if (err) throw err;
                cb()
            })
        })
    }
}

/*=====================================================================================*/

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

Model.login()

let employee = new Employee()
module.exports = Model