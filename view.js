class View{
  static registerEmployeeView(username,password,position,totalEmployee){
    console.log(`save data success ${username}, ${password}, ${position}. Total employee : ${totalEmployee}`);
  }

  static loginEmployeeView(loginCondition,username){
    if(loginCondition == true){
      console.log((`user ${username} logged in successfully`));
    }else{
      console.log(`username / password wrong`);
    }
  }

  static logoutEmployeeView(logoutCondition,username){
    if(logoutCondition == true){
      console.log((`user ${username} logout in successfully`));
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
