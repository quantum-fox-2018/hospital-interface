const view = require("./view.js");
const Hospital = require("./hospital.js");
// let hospital = new Hospital();

class Controller{
  static cekCommands(param_command){
    Hospital.commandCheck(param_command, (cbResult) =>{
      view.show(cbResult);
    });

  }
}

module.exports = Controller;
