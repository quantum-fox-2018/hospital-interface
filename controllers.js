const Models = require('./models/')
const EmployeeView = require('./views/view_employee')
const PatientView = require('./views/view_patient')
const HospitalView = require('./views/view_hospital')

class Controller{
    constructor() {
        
    }

    static syntax(syntax, value1, value2){
        // console.log(syntax, value1, value2)
        switch(syntax){
            case 'register':
                Models.registerEmployee(value1, value2[0], value2[1], EmployeeView.addSuccess)
                break;
            case 'login':
                Models.checkLogin(value1, value2[0], EmployeeView.statusLogin)
                break;
            case 'addPatient':
                let diagnosis = value2.join(' ')
                Models.addPatient(value1, diagnosis, PatientView.addSuccess)
                break;
            case 'hospital':
                let name = value1
                let address = value2.join(' ')
                Models.hospitalInfo(name, address, HospitalView.showData)
                break;
            case 'logout':
                Models.logout()
                break;
        }
    }
}

// console.log(models.model_employee)
module.exports = Controller