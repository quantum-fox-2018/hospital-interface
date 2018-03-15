"use strict"
const Hospital = require('./hospital.js')
const View = require('./view.js')

class Controller {
    static employeeRegistration(name, position, password) {
       let addingPerson = Hospital.Model.addEmployee(name, position, password);
       View.registration(addingPerson);
    } 
}

module.exports = Controller; 