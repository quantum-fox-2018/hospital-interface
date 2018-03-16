const Controller = require('./controller.js');

if(process.argv[2] === 'register'){
  Controller.registerEmployee(process.argv[3],process.argv[4],process.argv[5]);

} else if(process.argv[2] === 'login'){
  Controller.loginEmployee(process.argv[3],process.argv[4]);

} else if(process.argv[2] === 'addPatient'){
  Controller.registerPatient(process.argv);

} else if(process.argv[2] === 'logout'){
  Controller.logoutEmployee(process.argv);
}
