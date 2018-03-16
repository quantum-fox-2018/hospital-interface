let Model = require('./model.js');
let View = require('./view.js');

class Controller{
    static processData(command, input){
        if(command == 'register'){
            Model.employeesProcess(input, Model.register);
        }else if(command == 'login'){
            Model.employeesProcess(input, Model.login);
        }else if(command == 'addPatient'){
            Model.patientProcess(input, Model.employeeToAddPatient,Model.addPatient);
        }else if(command == 'listOfEmployees'){
            Model.employeesProcess(input, Model.list);
        }else if(command == 'logout'){
            Model.employeesProcess(input, Model.logout);
        }
    }

    static sendToView(str){
        View.showConfirmation(str);
    }

    static sendTable(data){
        View.showTable(data);
    }
}

module.exports = Controller;