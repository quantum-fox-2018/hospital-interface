const Model = require('./model.js');
const View = require('./view.js');

class Controller{

  static registerEmployee(name, password, position){
    Model.addEmployeeToFile(name, password, position, (data,total) =>{
      (data) ?
      View.showSuccess('register', [data,total]) : View.showFail('register');
    });
  }

  static loginEmployee(name, password){
    Model.checkLoginEmployee(name,password, (login_check)=>{
      (login_check) ?
      View.showSuccess('login', name) : View.showFail('login');
    });
  }


  static logoutEmployee(){
    Model.deleteLoggedEmployee((login_check)=>{
      (login_check)?
     View.showSuccess('logout') : View.showFail('logout');
    })
  }

  static registerPatient(patient_data){
    Model.addPatient(patient_data, (err,total_patient,check_doctor)=>{
      if(!check_doctor){
        View.showFail('patient', 'not doctor');
        return;
      }

      (!err) ?
      View.showSuccess('patient',total_patient) : View.showFail('patient');
    });
  }
}

module.exports = Controller;
