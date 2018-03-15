const modelHospital = require('../models/modelHospital.js')
const Employee = require('../models/modelEmployee.js')

const viewEmployee = require('../views/viewEmployee')


class Controller {
    constructor(){
        
    }
    static manageCommand(command, value1, value2, value3){
        switch (command) {
            case 'list':
                modelHospital.listEmployee(viewEmployee.list)
                break;
            case 'register':
                modelHospital.registerEmployee(value1, value2, value3, viewEmployee.notifRegister)
                break;
            case 'login':
                modelHospital.login(value1, value2, viewEmployee.notifLogin)
                break;
            default:
                break;
        }
    }
}

module.exports = Controller