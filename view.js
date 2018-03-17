class View {
  constructor() {}

  static listEmployees(employees){
    console.log(employees);
  }

  static register(newEmployee){
    console.log(`save data success ${newEmployee.username}.`);
  }

  static login(loginStatus, employeeLogin){
    if(loginStatus === true){
      console.log(`user ${employeeLogin.username} logged in successfully`);
    }else{
      console.log(`username or password wrong`);
    }
  }

  static listPatient(patients){
    console.log(patients);
  }

  static addPatient(listPatient, status){
    if(status === true){
      console.log(`data pasien berhasil ditambahkan. Total data pasien : ${listPatient.length}`);
    }else{    
    console.log('tidak memiliki akses untuk add patient');
    }
  }
}

module.exports = {View};
