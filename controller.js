const {View} = require('./view.js');
const {Model} = require('./model.js');

class Controller {
  static do(input) {
    let menu = input[2];
    if(menu === "list") {
      let path = './employee.json';
      if(input[3] === "patient") {
        path = './patient.json';
      }
      Model.readData(path, View.viewTable);
    } else if(menu === "register") {
      let objEmp = {
        name: input[3],
        username: input[3],
        password: input[4],
        position: input[5],
        isLogin: false
      };
      Model.readData('./employee.json', (data) => {
        Model.register('./employee.json', data, objEmp, View.view);
      });
    } else if(menu === "login") {
      Model.readData('./employee.json', (data) => {
        Model.login('./employee.json', data, input[3], input[4], View.view);
      });
    } else if(menu === "addPatient") {
      let objPatient = {
        name: input[3],
        diagnosis: input.slice(4)
      }
      Model.readData('./employee.json', (dataEmp) => {
        Model.readData('./patient.json', (dataPatient) => {
          Model.addPatient('./patient.json', dataEmp, dataPatient, objPatient, View.view);
        });
      });
    } else if(menu === "logout") {
      Model.readData('./employee.json', (data) => {
        Model.logout('./employee.json', data, View.view);
      });
    } else {
      View.view("Inputan tidak valid");
    }
  }
}

module.exports = {
  Controller
}
