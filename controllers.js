const EmployeeModel = require('./models/model_employee')
const EmployeeView = require('./views/view_employee')
const PatientModel = require('./models/model_patient')
const PatientView = require('./views/view_patient')

class Controller{
    constructor() {
        
    }

    static syntax(syntax, value1, value2, value3){
        switch(syntax){
            case 'register':
                EmployeeModel.registerEmployee(value1, value2, value3, EmployeeView.addSuccess)
                break;
            case 'login':
                EmployeeModel.checkLogin(value1, value2, EmployeeView.statusLogin)
                break;
            case 'addPatient':
                PatientModel.addPatient(value1, value2, PatientView.addSuccess)
                break;
        }
    }
}

// console.log(models.model_employee)
module.exports = Controller