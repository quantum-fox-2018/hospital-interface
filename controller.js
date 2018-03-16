const Model = require('./model.js')
const View = require('./view.js')

class Controller {
  static acceptCommand(command){
    if (!command[2] || command[2].toLowerCase() === "help") {
      let help = []
      help.push("command list")
      help.push("register <username> <password> <role>")
      help.push("login <username> <password>")
      help.push("addpatient <nama pasien> <penyakit1> <penyakit 2> ...")
      help.push("logout")
      help.push("status")
      help.push("listemployee")
      help.push("listpatient")
      View.display(help.join("\n").toString())
    }else if (command[2].toLowerCase() === "register") {
      let info = Model.register(command.slice(3,6), function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "login"){
      let info = Model.login(command.slice(3,5), function(str){
        View.display(str)
      })
    }else if(command[2].toLowerCase() === "addpatient"){
      let listPenyakit =[]
      for (var i = 4; i < command.length; i++) {
        listPenyakit.push(command[i])
      }
      Model.addPatient(command, function(str){
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
    }else if(command[2].toLowerCase() === "listemployee"){
      Model.displayEmployee(function(data){
        View.displayTableEmployee(data)
      })
    }else if(command[2].toLowerCase() === "listpatient"){
      Model.displayPatient(function(data){
        View.displayTablePatient(data)
      })
    }
  }
}

module.exports = Controller
