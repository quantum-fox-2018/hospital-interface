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

  constructor(name, location) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
  }

  static readEmployeeData(cbHospitalData){
    fs.readFile('employee.json','utf8', (err,hospitalData) => {
      cbHospitalData(JSON.parse(hospitalData));
    });
  }

  static registerEmployeeCommand(username,password,position,cbNewEmployeeData){

    this.readEmployeeData(function(hospitalData){

      let newEmployee = new Employee(username,password,position);

      if(hospitalData.length == 0){
        var hospital= new Model("Pondok Indah", "Deket MCD");
        hospital.employees.push(newEmployee);
        Model.writeEmployeeData(hospital)
        cbNewEmployeeData(hospital.employees);
      }
      else{
        hospitalData.employees.push(newEmployee);
        Model.writeEmployeeData(hospitalData)
        let employeesData = hospitalData.employees;
        cbNewEmployeeData(employeesData);
      }
    });

  }

  static writeEmployeeData(hospitalData){
    fs.writeFile('employee.json',JSON.stringify(hospitalData, null, 2),'utf8',(err)=>{
    });
  }

  static loginEmployeeCommand(username,password,cbLoginCondition){

    this.readEmployeeData((hospitalData)=>{

      let loginCondition = false
      let employeeData = hospitalData.employees;
      for(let i=0;i<employeeData.length;i++){
        if(employeeData[i].username == username && employeeData[i].password == password){
          hospitalData.employees[i].status = "available";
          loginCondition = true;
        }
        else{
          hospitalData.employees[i].status = "unavailable";
        }
      }
      Model.writeEmployeeData(hospitalData);
      cbLoginCondition(loginCondition)
    });

  }

  static logoutEmployeeCommand(username,cbLogoutCondition){
    this.readEmployeeData((hospitalData)=>{
      let logoutCondition = false;
      let employeeData = hospitalData.employees
      for(let i=0;i<employeeData.length;i++){
        if(employeeData[i].username == username && employeeData[i].status == "available"){
          hospitalData.employees[i].status = "unavailable";
          Model.writeEmployeeData(hospitalData);
          logoutCondition = true;
        }
      }
      cbLogoutCondition(logoutCondition);
    })
  }

  static addPatientCommand(patientName,penyakitPasien,cbUpdateDataPatient){

    this.readEmployeeData(hospitalData=>{
      let employeeData = hospitalData.employees;
      let checkData = false;
      for(let i=0;i<employeeData.length;i++){
        //Cari dokter yang available
        if(employeeData[i].position == "dokter" && employeeData[i].status == "available"){
          //Jika belum ada property pasien
          if(employeeData[i].patient === undefined){
            employeeData[i].patient = [];
          }
          let newPatient = new Patient((employeeData[i].patient.length+1),patientName,penyakitPasien);
          hospitalData.employees[i].patient.push(newPatient);
          hospitalData.patients.push(newPatient);
          Model.writeEmployeeData(hospitalData);
          checkData = true;
          cbUpdateDataPatient(employeeData[i]);
        }
      }

      if(checkData == false){
        cbUpdateDataPatient(undefined)
      }
    });
  }
}

module.exports = Model;
