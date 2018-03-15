var argv = process.argv;
const Controller = require('./controller');

if(argv[2] == "addPatient"){
  var penyakitPasien = [];
  for(let i=5;i<argv.length;i++){
    penyakitPasien.push(argv[i]);
  }
}

switch (argv[2]) {
  case "register":Controller.registerEmployeeCommand(argv[3],argv[4],argv[5]);break;
  case "login":Controller.loginEmployeeCommand(argv[3],argv[4]);break;
  case "addPatient":Controller.addPatientCommand(argv[3],argv[4],penyakitPasien);break;
  default:break;
}
