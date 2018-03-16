"use strict"
const models = require('./hospital.js')
const Hospital = models.Hospital
const View = require('./view.js')

class Controller {
    static employeeRegistration(name, password, position) {
       Hospital.addEmployee(name, password, position, function(statusMessage, objEmployee, totalEmployee) {
           View.registration(statusMessage, objEmployee, totalEmployee);
       });
    }
    
    static employeeLogin(username, password) {
        Hospital.loginEmployee(username, password, function(statusMessage, loggedUser) {
            View.login(statusMessage, loggedUser);
        });
    }
}

module.exports = Controller; 