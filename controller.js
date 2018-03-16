const View = require('./view.js');
const Model = require('./model.js');

class Controller {
  static menu(input) {
    var command = input[2];

    if (command == 'register') {
      let objRegist = {
        name     : input[3],
        username : input[4],
        password : input[5],
        role     : input[6]
      };

      Model.register('./employee.json', objRegist, viewData => {
        View.addSuccess(viewData);
      });
    }

    if (command = 'login') {
      let objLogin = {
        username     : input[3],
        password     : input[4]
      };

      Model.login('./employee.json', objLogin, viewData => {
         View.loginSuccess(viewData);
      })
    }
  }

}

module.exports = Controller;
