class View{
  static registerEmployeeView(newEmployee,totalEmployee){
    console.log(`save data success ${newEmployee.username}, ${newEmployee.password}, ${newEmployee.position}. Total employee : ${totalEmployee}`);
  }

  static loginEmployeeView(loginCondition,username){
    if(loginCondition == true){
      console.log((`user ${username} logged in successfully`));
    }else{
      console.log(`username / password wrong`);
    }
  }

  static addPatientView(newPatient){
    if(newPatient == undefined){
      console.log(`tidak memiliki akses untuk add patient`);
    }else{
      let totalPatient = newPatient.patient.length;
      console.log(`data pasien berhasil ditambahkan. Total data pasien : ${totalPatient}`);
    }
  }


}

module.exports = View;
