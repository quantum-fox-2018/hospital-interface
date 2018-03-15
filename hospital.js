const fs = require('fs');
const employee_file = './employees.json';
const logged_user_file = './logged_user.json';
const patient_file = './patients.json';

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

function getFileData(file_path){
  return JSON.parse(fs.readFileSync(file_path,'utf8'));
}

function writeFileData(file_path, data){
  fs.writeFileSync(file_path, JSON.stringify(data));
}

function registerEmployee(name, password, position){
  let employees = getFileData(employee_file);
  let new_employee = new Employee(name, position, name, password);

  employees.push(new_employee);

  writeFileData(employee_file, employees);

  console.log(`save data success { username: ${name}, password: ${password}, position: ${position}}, Total employee ${employees.length}`)

}

function loginEmployee(name, password){
  let login_check = false;
  let logged_user;
  let employees = getFileData(employee_file);

  for(let index in employees){
    if(employees[index].password === password && employees[index].username === name){
      login_check = true;
      logged_user = employees[index];
      break;
    }
  }

  (!login_check) ? console.log('username/password is invalid') : console.log(`user ${name} logged in successfully`);

  writeFileData(logged_user_file, logged_user);

}


function logoutEmployee(){

  writeFileData(logged_user_file, {});
  console.log(`user logged out successfully`);

}

function addPatient(patient_data){
  let employee = getFileData(logged_user_file);
  let id;
  let name = process.argv[3];
  let diagnosis = [];

  if(employee.position !== 'dokter'){
    console.log('Only a doctor that can add patient')
    return;
  }

  for(let index = 3; index < (process.argv).length; index++){
    if(index !== 3){
      diagnosis.push(process.argv[index]);
    }
  }

  let patients = getFileData(patient_file);
  id = patients.length+1;

  let new_patient = new Patient(id, name, diagnosis);

  patients.push(new_patient);

  writeFileData(patient_file,patients);

  console.log(`add patient data success Total employee ${patients.length}`)

}

module.exports = {
  registerEmployee,
  loginEmployee,
  addPatient,
  logoutEmployee
};
