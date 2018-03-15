const Model = require('./model.js')
const View = require('./view.js')

class Controller {
  static acceptCommand(command){
    if (command[2].toLowerCase() === "register") {
      let info = Model.register(command[3], command[4], command[5], function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "login"){
      let info = Model.login(command[3], command[4], function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "addpatient"){
      let listPenyakit =[]
      for (var i = 4; i < command.length; i++) {
        listPenyakit.push(command[i])
      }
      Model.addPatient(command[3], listPenyakit, function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "logout"){
      Model.logout(function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "status"){
      Model.status(function(str){
        View.display(str)
      })
    }
  }
}

module.exports = Controller
