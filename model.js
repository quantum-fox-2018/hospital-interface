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

  static readEmployeeData(cbEmployeeData){
    fs.readFile('employee.json','utf8', (err,employeeData) => {
      cbEmployeeData(JSON.parse(employeeData))
    });
  }

  static registerEmployeeCommand(username,password,position,cbNewEmployeeData){

    this.readEmployeeData((cbEmployeeData) =>{
      var employeeData = cbEmployeeData;
      let newEmployee = new Employee(username,password,position);
      employeeData.push(newEmployee);
      this.writeEmployeeData(employeeData)
      cbNewEmployeeData(employeeData);
    });

  }

  static writeEmployeeData(employeeData){
    fs.writeFile('employee.json',JSON.stringify(employeeData, null, 2),'utf8',(err)=>{
    });
  }

  static loginEmployeeCommand(username,password,cbLoginCondition){

    this.readEmployeeData((cbEmployeeData)=>{
      let employeeData = cbEmployeeData;
      let loginCondition = false
      for(let i=0;i<employeeData.length;i++){
        if(employeeData[i].username == username && employeeData[i].password == password){
          employeeData[i].status = "available";
          loginCondition = true;
        }
        else{
          employeeData[i].status = "unavailable";
        }
      }
      this.writeEmployeeData(employeeData);
      cbLoginCondition(loginCondition)
    });

  }

  static logoutEmployeeCommand(username,cbLogoutCondition){
    this.readEmployeeData((cbEmployeeData)=>{
      let employeeData = cbEmployeeData;
      let logoutCondition = false;
      for(let i=0;i<employeeData.length;i++){
        if(employeeData[i].username == username && employeeData[i].status == "available"){
          employeeData[i].status = "unavailable";
          this.writeEmployeeData(employeeData);
          logoutCondition = true;
        }
      }
      cbLogoutCondition(logoutCondition);
    })
  }

  static addPatientCommand(patientName,penyakitPasien,cbUpdateDataPatient){

    this.readEmployeeData(cbEmployeeData=>{
      let employeeData = cbEmployeeData;
      for(let i=0;i<employeeData.length;i++){
        //Cari dokter yang available
        if(employeeData[i].position == "dokter" && employeeData[i].status == "available"){
          //Jika belum ada property pasien
          if(employeeData[i].patient == undefined){
            employeeData[i].patient = [];
          }
          let newPatient = new Patient((employeeData[i].patient.length+1),patientName,penyakitPasien);
          employeeData[i].patient.push(newPatient);
          Model.writeEmployeeData(employeeData);
          cbUpdateDataPatient(employeeData[i]);
        }
      }
      cbUpdateDataPatient(undefined);
    });
  }
}

module.exports = Model;
