
const Model = require('../model/Model.js')
const Views = require('../view/view.js')

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command == 'help'){
      Views.help()
    } else if(this.command == 'employeeList'){
      Model.employeeList(Views.listView)
    } else if(this.command == 'register'){
      Model.addEmployee(this.content,Views.registerView)
    } else if(this.command=='login'){
      Model.login(this.content,Views.loginView)
    } else if(this.command=='addPatient'){
      let disease = this.content.slice(1)
      Model.addPatient(this.content,disease,Views.addPatientView)
    } else if(this.command=='logout'){
      Model.logout(Views.logoutView)
    }
  }
}

module.exports = Controller
