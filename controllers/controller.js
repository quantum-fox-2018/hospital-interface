const Model = require('../models/index')
const viewEmployee = require('../views/viewEmployee')


class Controller {
    constructor(){
         
    }
    static manageCommand(command, argvArray){
        switch (command) {
            case 'list':
                // udah bener
                Model.listEmployee(viewEmployee.list)
                break;
            case 'register':
                Model.registerEmployee(argvArray[0], argvArray[1], argvArray[2], viewEmployee.notifRegister)
                break;
            case 'login':
                Model.login(argvArray[0], argvArray[1], viewEmployee.notifLogin)
                break;
            case 'addPatient':
                Model.dokterAccessInputPatient(argvArray[0], argvArray.slice(1));
                break;
            case 'logout':
                Model.logout();
                break;
            default:
                break;
        }
    }
}

module.exports = Controller