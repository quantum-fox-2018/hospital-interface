const view = require("./view.js");
const Hospital = require("./hospital.js");
let hospital = new Hospital();

class Controller{
  static cekCommands(param_command){
    let command = hospital.commandCheck(param_command);
    view.show(command);
  }
}

module.exports = Controller;
