const Controller = require('./controller.js');

class View {

  static showSuccess(function_name, data){
    switch(function_name){
      case 'register' :
        console.log(`save data success { username: ${data[0].name}, password: ${data[0].password}, position: ${data[0].position}}, Total employee ${data[1]}`)
        break;
      case 'login' :
        console.log(`user ${data} logged in successfully`);
        break;
      case 'logout' :
        console.log(`user logged out successfully`);
        break;
      case 'patient' :
        console.log(`add patient data success Total patient ${data}`);
        break;
    }
  }

  static showFail(function_name,data){
    switch(function_name){
      case 'register' :
        console.log(`register fail`)
        break;
      case 'login' :
        console.log('username/password is invalid');
        break;
      case 'logout' :
        console.log(`fail user logged out`);
        break;
      case 'patient' :
        (data) ?
        console.log(`only doctor can register new patient`) :
        console.log(`register patient fail`);
        break;
    }
  }

}

module.exports = View;
