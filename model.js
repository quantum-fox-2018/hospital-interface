const fs = require('fs');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  static read(callback){
    fs.readFile('./employee.json', 'utf8', (err, data) =>{
      let dataParse = JSON.parse(data)
      let arrPegawai=[];

      for(let i=0; i<dataParse.length; i++){
        let listPegawai = new Employee(dataParse[i].username, dataParse[i].password, dataParse[i].position, dataParse[i].login)
        // console.log(listPegawai);
        arrPegawai.push(listPegawai)
      }
      callback(arrPegawai)
    })
  }

  static readPatient(callback){
    // fs.readFile('./patientData.json', 'utf8', callback)
    fs.readFile('./patientData.json', 'utf8', (err, data) => {
      let parsePatient = JSON.parse(data)
      let arrPatients = [];
      for(let i=0; i<parsePatient.length; i++){
        let listPegawai = new Patient(parsePatient[i].id, parsePatient[i].name, parsePatient[i].diagnosis)
        // console.log(listPegawai);
        arrPatients.push(listPegawai)
      }
      callback( arrPatients)
    })
  }

  static login(argvLogin, callback){
    this.read(function (employees){
      let login = false;
      for(let i=0; i<employees.length; i++){
        if(employees[i].username === argvLogin[0] && employees[i].password === argvLogin[1]){
          login = true
          employees[i].login = true
          fs.writeFile('./employee.json', JSON.stringify(employees, null, 2), 'utf8', (err) => {
            callback(login, employees[i])
          });
        }
      }
    });
  }

  static register(argvInput, callback){
    this.read(function (employees){
      let newEmployee = new Employee(argvInput[0], argvInput[1], argvInput[2], false)
      employees.push(newEmployee)
      fs.writeFile('./employee.json', JSON.stringify(employees, null, 2), 'utf8', (err) => {
        callback(newEmployee)
      });
    });
  }

  static addPatient(argvPatient, callback){
    this.read((listEmployee => {
      let loginstatus = false
      for(let i=0; i<listEmployee.length; i++){
        if(listEmployee[i].position === 'dokter' && listEmployee[i].login === true){
          loginstatus = true;
        }
      }

      if(loginstatus === true){

        let diagnosis = argvPatient.slice(1).join(" ")
        this.readPatient((patientsList) => {
          let id;
          if(patientsList == false){
            id = 1
          }else{
            id = Math.max(...patientsList.map(data => { return data.id; })) + 1;
          }

          let newPatient = new Patient(id, argvPatient[0], diagnosis)
          patientsList.push(newPatient)
          fs.writeFile('./patientData.json', JSON.stringify(patientsList, null, 2), 'utf8', (err) => {
            callback(patientsList, true)
          });
        });

      }else{
        callback(false, false)
      }

    }));

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
  constructor(username, password, position, login) {
    this.username = username
    this.password = password
    this.position = position
    this.login = login
  }
}


module.exports = {
                    Hospital
                  }
