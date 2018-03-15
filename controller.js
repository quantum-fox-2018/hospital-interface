const Model = require('./model.js')
const View = require('./view.js')

class Controller {
  static acceptCommand(command){
    if (command[2].toLowerCase() === "register") {
      let info = Model.register(command[3], command[4], command[5])
      View.display(info)
    }else if(command[2].toLowerCase() === "login"){
      let info = Model.login(command[3], command[4])
      View.display(info)
    }else if(command[2].toLowerCase() === "addpatient"){
      let listPenyakit =[]
      for (var i = 4; i < command.length; i++) {
        listPenyakit.push(command[i])
      }
      let info = Model.addPatient(command[3], listPenyakit)
      View.display(info)
    }else if(command[2].toLowerCase() === "logout"){
      let info = Model.logout()
      View.display(info)
    }else if(command[2].toLowerCase() === "status"){
      let info =Model.status()
      View.display(info)
    }
  }
}

module.exports = Controller
