const fs = require('fs')

const Employee = require('./Employee.js')
const Patient = require('./Patient.js')
const Hospital = require('./Hospital.js')
const Views = require('./view.js')
let data = fs.readFileSync('./employee.json','utf8')
var employeeData = JSON.parse(data)
const harapanKita = new Hospital('HarapanSemua','Jakarta',employeeData)

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command == 'register'){
      let newEmployee = new Employee(this.content[0],this.content[1],this.content[2],this.content[3])
      harapanKita.addEmployee(newEmployee,Views.registerView)
    } else if(this.command=='login'){
      harapanKita.login(this.content,Views.loginView)
    } else if(this.command=='addPatient'){
      let disease = this.content.slice(1)
      let newPatient = new Patient(this.content[0],disease)
      harapanKita.addPatient(newPatient,Views.addPatientView)
    } else if(this.command=='logout'){
      harapanKita.logout(Views.logoutView)
    }
  }
}

module.exports = Controller
