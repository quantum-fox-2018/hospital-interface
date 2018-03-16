const {Employee, Patient} = require('./model.js')
// const Patient  = require('./model.js');
const View  = require('./view.js')


class Controller {
  constructor() {

  }

  static command(index_argv){
    if(index_argv[2] === 'register'){
      Employee.registerEmployee(index_argv[3], index_argv[4], index_argv[5], function(data){
        View.save_data_success(Employee.createNewEmployee(index_argv[3], index_argv[4], index_argv[5]), data)
      });

    } else if(index_argv[2] === 'login'){
        Employee.loginFeature(index_argv[3], index_argv[4], function(data){
        View.loginFeature(data, index_argv[3]);
      });
    } else if(index_argv[2] === 'addPatient'){
      Patient.registerPatient(index_argv[3], index_argv[4], index_argv[5], function(data){
        View.save_data_patient(Patient.createNewPatient(index_argv[3], index_argv[4], index_argv[5]), data)
      });
    }

  }
}

module.exports = Controller;
