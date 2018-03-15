const Model = require('./model')
const View = require('./view')

class Controller{

  static registerEmployeeCommand(username,password,position){
    let newEmployee = Model.registerEmployeeCommand(username,password,position);
    let totalEmployee = Model.readEmployeeData().length;
    View.registerEmployeeView(newEmployee,totalEmployee)
  }

  static loginEmployeeCommand(username,password){
    let loginCondition = Model.loginEmployeeCommand(username,password);
    View.loginEmployeeView(loginCondition,username);
  }

  static addPatientCommand(id,patientName,penyakitPasien){
    let newPatient = Model.addPatientCommand(id,patientName,penyakitPasien);
    View.addPatientView(newPatient);
  }
}

module.exports = Controller
