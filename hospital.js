//model files
const fs = require ('fs');
const Employee = require("./employee.js");
const Patient = require("./patient.js");

class Hospital {
  constructor() {

  }

  static commandCheck(param_command, cbResult){
    let command = param_command[2];

    //ga pake break soalny dah langsung return
    switch (command) {
      case 'show':
          let secondAction = param_command[3];
          return Hospital.showData(secondAction, cbResult);

      case undefined:
          return cbResult(`masukan action / command`);

      case 'register':
          let reg_username = param_command[3];
          let reg_password = param_command[4];
          let reg_jabatan = param_command[5];
          return Hospital.addEmployee(reg_username, reg_password, reg_jabatan, cbResult);
          //return Hospital.readEmployeeData(Hospital.addEmployee(Employeedata, reg_username, reg_password, reg_jabatan));

      case 'login':
          let username_login = param_command[3];
          let password_login = param_command[4];
          return Hospital.validateLogin(username_login, password_login, cbResult);

      case 'logout':
          let username_logout = param_command[3];
          return Hospital.userLogout(username_logout, cbResult);

      case 'addPatient':
          let patientName = param_command[3];
          let diagnose = param_command.slice(4);
          return Hospital.addPatient(patientName, diagnose, Hospital.cekUserLogin, cbResult);


      default:
          return cbResult(`Nama action / command belum ada!`);

    }
  }

  static showData(secondAction, cbResult){
    switch (secondAction) {
      case 'patient':
          cbResult('Data Patient');
          break;
      case 'employee':
          cbResult('Data employee');
          break;
      default:
          cbResult(`action ${secondAction} belum ada!`);
    }
  }

  static cekUserLogin(patientName, diagnose, cbResult){

    Hospital.readPatientData((patientData) => {
      let lastId = Hospital.patient_id_auto(patientData);
      let newPatient = new Patient(lastId, patientName, diagnose);
      patientData.push(newPatient);
      Hospital.updatePatientData(patientData);
      let totalPatientData = patientData.length;
      let result = `data pasien berhasil ditambahkan. Total data pasien : ${totalPatientData}`;
      cbResult(result);
    });
  }

  static patient_id_auto(patientData){
    let patientLaskIndex = patientData.length-1;
    let lastId = patientData[patientLaskIndex].id;
    lastId += 1;
    return lastId;
  }

  static addPatient(patientName, diagnose, cbUserCheck, cbResult){

    Hospital.readEmployeeData((Employeedata) =>{
      let isItDocter = false;
      for(let employeeIndex = 0; employeeIndex < Employeedata.length; employeeIndex++){
        if(Employeedata[employeeIndex].isLogin == "true" &&
          Employeedata[employeeIndex].position == "dokter"){
            cbUserCheck(patientName, diagnose, cbResult);
            isItDocter = true;
        }
      }

      if(isItDocter == false){
        let result = `Hanya dokter yang bisa menambah patient`;
        cbResult(result);
      }

    });

  }

  static readPatientData(cb){
    fs.readFile("./patient.json", "utf8", (err, patientData)=>{
      cb(JSON.parse(patientData));
    });
  }

  static updatePatientData(patientData){
    fs.writeFile("./patient.json", JSON.stringify(patientData, null, 2));
  }

  static addEmployee(name, password, position, cbResult){
    if(name != undefined || password != undefined || position != undefined){

        Hospital.readEmployeeData((employeeData) =>{
            let newEmployee = new Employee(name, position, name, password);
            employeeData.push(newEmployee);
            Hospital.updateEmployeeData(employeeData);
            let result = `save data success {"username":"${name}","password":"${password}","role":"${position}"}. Total employee :${employeeData.length}`;
            cbResult(result);
        });

    }else{
        return `nama, password / jabatan harus di isi!`;
    }

  }

  static readEmployeeData(cb){
    fs.readFile("./employee.json", "utf8", (err, Employeedata)=>{
      cb(JSON.parse(Employeedata));
    });
  }

  static updateEmployeeData(Employeedata){
    fs.writeFile('employee.json', JSON.stringify(Employeedata, null, 2));
  }

  static validateLogin(userName, password, cbResult){

    Hospital.readEmployeeData((Employeedata) =>{
        let userLoginIndex = -1;

        for(let employeeIndex = 0; employeeIndex < Employeedata.length; employeeIndex++){
            if(Employeedata[employeeIndex].isLogin == 'true'){
                let userName = Employeedata[employeeIndex].username;
                let result = `user ${userName} still login`;
                cbResult(result);
                break;
            }

            if(Employeedata[employeeIndex].username == userName &&
              Employeedata[employeeIndex].password == password){
                userLoginIndex = employeeIndex;
            }
        }

        if(userLoginIndex != -1){
            Employeedata[userLoginIndex].isLogin = 'true';
            Hospital.updateEmployeeData(Employeedata);
            let result = `user ${userName} logged in successfully`;
            cbResult(result);
        }
    });

  }

  static userLogout(userName, cbResult){
    Hospital.readEmployeeData((Employeedata) =>{
      for(let employeeIndex = 0; employeeIndex < Employeedata.length; employeeIndex++){
        if(Employeedata[employeeIndex].username == userName){
            Employeedata[employeeIndex].isLogin = 'false';
            Hospital.updateEmployeeData(Employeedata);
            let result = `user ${userName} Logout from the program..`;
            cbResult(result);
        }
      }
    });
  }
}

module.exports = Hospital;
