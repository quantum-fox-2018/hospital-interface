'use strict'
class HospitalView{
  constructor(){

  }
}

class PatientView{
  constructor(){

  }
  static showPatient(countPatient,successAdd){
    if(successAdd===true){
      console.log('data pasien berhasil ditambahkan. Total data pasien : '+countPatient);
    }
    else{
      console.log('tidak memiliki akses untuk add pasien');
    }
  }
}

class EmployeeView{
  constructor(){

  }

  static showEmployee(objEmp,arrLength,check){
    if(check===true){
      console.log('save data success '+objEmp+'. Total employee : '+arrLength);
    }
    else{
      console.log('Username already exist');
    }

  }

  static showLogin(username,check){
    if(check===true){
      console.log('user '+username+' logged in successfully');
    }
    else{
      console.log('username / password wrong');
    }
  }

  static showLogout(){
    console.log('Logout successfully');
  }
}

module.exports = {
  HospitalView,PatientView,EmployeeView
}
