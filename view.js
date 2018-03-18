var Table = require('cli-table2');

class View {
  constructor() {}

  static listEmployees(employees){
    // instantiate
    let table = new Table({
        head: ['No', 'username', 'password', 'position', 'status Login']
      , colWidths: [5, 10]
    });

    for(let i=0; i<employees.length; i++){
      table.push(
        [`${i+1}`, employees[i].username, employees[i].password, employees[i].position, employees[i].login]
      );
    }
    console.log(table.toString());
  }

  static listPatient(patients){
    // instantiate
    let table = new Table({
        head: ['Id', 'Nama', 'Diagnosis']
      , colWidths: [5, 10]
    });

    for(let i=0; i<patients.length; i++){
      table.push(
        [patients[i].id, patients[i].name, patients[i].diagnosis]
      );
    }
    console.log(table.toString());
  }


  static register(newEmployee){
    console.log(`save data success ${newEmployee.username}.`);
  }

  static login(loginStatus, employeeLogin){
    console.log(loginStatus);
    if(loginStatus === true){
      console.log(`user ${employeeLogin.username} logged in successfully`);
    }else{
      console.log(`username or password wrong`);
    }
  }

  static logout(user, findUser){
    if(findUser){
      console.log(`user ${user} logged out`);
    }else{
      console.log(`no user is log in`);
    }
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
