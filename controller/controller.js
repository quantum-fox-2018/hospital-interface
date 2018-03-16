const Method = require('../model/Method.js')
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
      Method.employeeList(Views.listView)
    } else if(this.command == 'register'){
      Method.addEmployee(this.content,Views.registerView)
    } else if(this.command=='login'){
      Method.login(this.content,Views.loginView)
    } else if(this.command=='addPatient'){
      let disease = this.content.slice(1)
      Method.addPatient(this.content,disease,Views.addPatientView)
    } else if(this.command=='logout'){
      Method.logout(Views.logoutView)
    }
  }
}

module.exports = Controller
