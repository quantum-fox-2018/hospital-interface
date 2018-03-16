const fs = require('fs');
const Controller = require('./controller.js');

const employee_file = './employees.json';
const logged_user_file = './logged_user.json';

class Hospital {
  constructor(employees, patients) {
    this.name = 'RS Sehat Jiwa'
    this.employees = employees
    this.patients = patients
    this.location = 'Jln. Bang Udin 1, RT09/RW01, Pondok Indah, Jakarta'
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

class Model{

  static getFileData(file_path,callback){
    fs.readFile(file_path,'utf8', (err,data) =>{
      callback(JSON.parse(data));
    });
  }

  static writeFileData(file_path, data,callback){
    fs.writeFile(file_path, JSON.stringify(data,null,2), (err) =>{
      if(callback) callback(err);
    });
  }

  static addEmployeeToFile(name, password, position, callback){
    Model.getFileData(employee_file, (data) =>{
      let hospital;
      let new_employee = new Employee(name, position, name, password);
      (typeof data.employees !== 'undefined') ? (hospital = new Hospital(data.employees,data.patients)) :
      hospital = new Hospital([],[]);
      hospital.employees.push(new_employee);
      Model.writeFileData(employee_file, hospital, (err) =>{
        callback(new_employee, hospital.employees.length)
      });
    });
  }

  static checkLoginEmployee(name, password, callback){
    let login_check = false;
    let logged_user;
    Model.getFileData(employee_file, (data) =>{
      let hospital = data;
      for(let index in hospital.employees){
        if(hospital.employees[index].password === password && hospital.employees[index].username === name){
          login_check = true;
          logged_user = hospital.employees[index];
          break;
        }
      }

      if(login_check){
        Model.writeFileData(logged_user_file, logged_user);
        callback(true);
      } else {
        callback(false);
      }
    });
  }


  static deleteLoggedEmployee(callback){
    Model.writeFileData(logged_user_file, {}, (err)=>{
      (err) ? callback(false) : callback(true);
    });
  }

  static addPatient(patient_data, callback){
    Model.getFileData(logged_user_file,(data)=>{
      let employee = data;
      let id;
      let name = patient_data[3];
      let diagnosis = [];

      if(employee.position !== 'dokter'){
        callback(false, null, false);
        return;
      }

      for(let index = 3; index < (patient_data).length; index++){
        if(index !== 3){
          diagnosis.push(patient_data[index]);
        }
      }

      Model.getFileData(employee_file, (data)=>{
        let hospital;
        (typeof data.patients !== 'undefined') ? (hospital = new Hospital(data.employees,data.patients)) :
        hospital = new Hospital([],[]);
        id = hospital.patients.length+1;

        let new_patient = new Patient(id, name, diagnosis);

        hospital.patients.push(new_patient);

        Model.writeFileData(employee_file,hospital, (err)=>{
          (err) ? callback(true,null,true) : callback(false, hospital.patients.length,true);
        });
      });
    });
  }
}


module.exports = Model;
