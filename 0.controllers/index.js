const model = require('../0.models');
const view = require('../0.views');

class Controller {

    static routes(argv_data) {
        let command = argv_data[0];
        let input_data = argv_data.slice(1);

        switch(command) {
            // case 'showemployee' : this.showEmployee(); break;
            case 'employeeregister': this.registerEmployee(input_data); break;
            case 'employeelogin' : this.loginEmployee(input_data); break;
            case 'addpatient' : this.addPatient(input_data) ; break;
            // default: code block;
        }

    }


    // static showEmployee() {
    //     model.showEmployee();
    // }

    static registerEmployee(input_data) {
        model.registerEmployee(input_data, view);
    }

    static loginEmployee(input_data) {
        model.loginEmployee(input_data, view);
    }

    static addPatient(input_data) {
        model.addPatient(input_data, view);
    }


}


module.exports = Controller;
