//model files
const fs = require ('fs');
const Employee = require("./employee.js");

class Hospital {
  constructor(name, location, patients) {
    this.name = "RSU Cikarang"//name
    this.employees = require("./employee.json");//employees
    this.patients = patients
    this.location = "Cikarang Utara";
    this.currentUser = require("./currentUser.json");;
  }

  commandCheck(param_command){
    let command = param_command[2];

    //ga pake break soalny dah langsung return
    switch (command) {
      case 'show':
      case undefined:
          return this;

      case 'register':
          return this.addEmployee(param_command[3], param_command[4], param_command[5]);

      case 'login':
          return this.validateLogin(param_command[3], param_command[4]);


      default:
          return `Nama Command belum ada!`;

    }
  }

  addEmployee(name, password, position){
    if(name != undefined || password != undefined || position != undefined){
        let newEmployee = new Employee(name, position, name, password);
        this.employees.push(newEmployee);
        let employeeData = this.employees.length;
        this.updateEmployee();
        return `save data success {"username":"${name}","password":"${password}","role":"${position}"}. Total employee :${employeeData}`;
    }else{
        return `data gagal di tambah`;
    }

  }

  updateEmployee(){
    fs.writeFile('employee.json', JSON.stringify(this.employees, null, 2));
  }

  validateLogin(userName, password){
    let employeeData = this.employees;

    for(let employeeIndex = 0; employeeIndex < employeeData.length; employeeIndex++){
        if(employeeData[employeeIndex].username == userName && employeeData[employeeIndex].password == password){
            this.userLogin(employeeData[employeeIndex]);
            console.log('Kesini ga?');
            return `user ${userName} logged in successfully`;
        }
    }

    return `username / password salah`;
  }

  userLogin(UserData){
    this.currentUser.push(UserData);
    fs.writeFile('currentUser.json', JSON.stringify(this.currentUser, null, 2));
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

module.exports = Hospital;
