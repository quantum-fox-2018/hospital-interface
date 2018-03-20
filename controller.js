const Model = require('./model')
const View = require('./view')

class Controller{

  static registerEmployeeCommand(username,password,position,cbNewEmployeeData){

    Model.registerEmployeeCommand(username,password,position,(newEmployeeData)=>{
      let totalEmployee = newEmployeeData.length;
      View.registerEmployeeView(username,password,position,totalEmployee)
    })
  }

  static loginEmployeeCommand(username,password,cbLoginCondition){
    Model.loginEmployeeCommand(username,password,(loginCondition)=>{
      View.loginEmployeeView(loginCondition,username);
    });

  }

  static logoutEmployeeCommand(username,cbLogoutCondition){
    Model.logoutEmployeeCommand(username,(logoutCondition)=>{
      View.logoutEmployeeView(logoutCondition,username);
    })
  }
  static addPatientCommand(patientName,penyakitPasien){

    Model.addPatientCommand(patientName,penyakitPasien, (updatedDataPatient)=>{
      View.addPatientView(updatedDataPatient);
    });
  }
}

module.exports = Controller
