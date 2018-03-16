const Model = require('../models/Model')
const View = require('../views/View')

class Controller {
  static routes(argv) {
    let command = argv[2]
    let option = argv.splice(3)

    switch (command) {
      case 'register': Model.addEmployee(option, View.printLine); break;
      case 'login': Model.login(option, View.statusLogin); break;
      case 'logout': Model.logout(option, View.statusLogout); break;
      case 'addPatient': Model.addPatient(option, View.printLine); break;
    
      default:break;
    }

  }
}

module.exports = Controller