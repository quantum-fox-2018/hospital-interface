const fs = require('fs');

class Employee {
  constructor(username,password,position) {
    this.name = username
    this.position = position
    this.username = username
    this.password = password
    this.status = "unavailable"
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Model{
  static readEmployeeData(){
    let employeeData = JSON.parse(fs.readFileSync('employee.json','utf8'));
    return employeeData;
  }

  static registerEmployeeCommand(username,password,position){
    let employeeData = Model.readEmployeeData();
    let newEmployee = new Employee(username,password,position);
    employeeData.push(newEmployee);
    Model.writeEmployeeData(employeeData)
    return newEmployee;
  }

  static writeEmployeeData(employeeData){
    fs.writeFileSync('employee.json',JSON.stringify(employeeData),'utf8');
  }

  static loginEmployeeCommand(username,password){
    let employeeData = Model.readEmployeeData();
    for(let i=0;i<employeeData.length;i++){
      if(employeeData[i].username == username && employeeData[i].password == password){
        employeeData[i].status = "available";
        Model.writeEmployeeData(employeeData);
        return true
      }
    }
    return false
  }

  static addPatientCommand(id,patientName,penyakitPasien){
    let employeeData = Model.readEmployeeData();
    let newPatient = new Patient(id,patientName,penyakitPasien);
    for(let i=0;i<employeeData.length;i++){
      if(employeeData[i].position == "dokter" && employeeData[i].status == "available"){
        employeeData[i].patient = [];
        employeeData[i].patient.push(newPatient);
        Model.writeEmployeeData(employeeData);
        return employeeData[i];
      }
    }
  }

}

module.exports = Model;
