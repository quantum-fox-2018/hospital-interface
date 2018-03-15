const hospital = require('./hospital.js');

if(process.argv[2] === 'register'){
  hospital.registerEmployee(process.argv[3],process.argv[4],process.argv[5]);
} else if(process.argv[2] === 'login'){
  hospital.loginEmployee(process.argv[3],process.argv[4]);
} else if(process.argv[2] === 'addPatient'){
  hospital.addPatient(process.argv);
}
