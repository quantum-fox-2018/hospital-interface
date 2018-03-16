const Model = require('./model')
const View = require('./view')

class Controller{

  static registerEmployeeCommand(username,password,position,cbNewEmployeeData){

    Model.registerEmployeeCommand(username,password,position,(cbNewEmployeeData)=>{
      let totalEmployee = cbNewEmployeeData.length;
      View.registerEmployeeView(username,password,position,totalEmployee)
    })
  }

  static loginEmployeeCommand(username,password,cbLoginCondition){
    Model.loginEmployeeCommand(username,password,(cbLoginCondition)=>{
      let loginCondition = cbLoginCondition;
      View.loginEmployeeView(loginCondition,username);
    });

  }

  static logoutEmployeeCommand(username,cbLogoutCondition){
    Model.logoutEmployeeCommand(username,(cbLogoutCondition)=>{
      let logoutCondition = cbLogoutCondition;
      View.logoutEmployeeView(logoutCondition);
    })
  }
  static addPatientCommand(patientName,penyakitPasien){

    Model.addPatientCommand(patientName,penyakitPasien,cbUpdateDataPatient=>{
      let updateDataPatient = cbUpdateDataPatient;
      View.addPatientView(updateDataPatient);
    });
  }
}

module.exports = Controller
