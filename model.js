const fs = require('fs');

class Patient {
  constructor(id, name, diagnosis) {
    this.id         = id
    this.name       = name
    this.diagnosis  = diagnosis
  }

  static createNewPatient(id, name, diagnosis){
    let newPatient = new Patient(id, name, diagnosis)
    return newPatient;
  }

  static readPatient(callback){
    fs.readFile('patient.json', 'utf8', (err, data)=>{
      let patientData = JSON.parse(data);
      callback(patientData);
    })
  }

  static writePatient(patientData){
    let newPatientData = JSON.stringify(patientData, null, 2)
    fs.writeFile('patient.json', newPatientData, (err) => {

    })
  }

  static registerPatient(id, name, diagnosis, callback){
    Patient.readPatient(function(data){
      let newPatient = Patient.createNewPatient(id, name, diagnosis);
      data.push(newPatient);

      Patient.writePatient(data);
      callback(data)
    })
  }

}

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.position = position
    this.password = password
    this.status   = false;
  }

  static readEmployee(callback){
    fs.readFile('employee.json', 'utf8', (err, data)=>{
      let employeeData = JSON.parse(data);
      callback(employeeData);
    })
  }

  static writeEmployee(employeeData){
    let newEmployeeData = JSON.stringify(employeeData, null, 2)
    fs.writeFile('employee.json', newEmployeeData, (err) => {

    })
  }

  static createNewEmployee(username, password, position){
    let newEmployee = new Employee(username, password, position);
    return newEmployee;
  }

  static registerEmployee(username, password, position, callback){
    Employee.readEmployee(function(data){
      let newEmployee = Employee.createNewEmployee(username, password, position);
      data.push(newEmployee);

      Employee.writeEmployee(data);
      callback(data)
    })
  }

  static loginFeature(username, password, callback){
    Employee.readEmployee(function(data){
      let logincheck = false;
      for(let i = 0; i < data.length; i++){
        if(data[i].username === username && data[i].password === password){
          logincheck = true;
          data[i].status = true;
          Employee.writeEmployee(data);
          break;
        }
      }
      callback(logincheck);
    })
  }

  static checkRoleDokter(position){
    if(position === 'dokter'){
      return true;
    } else {
      return false;
    }
  }

}

module.exports = {Employee, Patient};
