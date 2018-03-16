const controller = require('./controller.js')

let argv = process.argv
/*test case:
register:
index.js register firstname lastname position username password
login :
index.js login username password
addPatient :
index.js patientName diagnosis
logout :
index.js logout


*/
switch (argv[2]) {
  case 'register':
    controller.registerEmployee(`${argv[3]} ${argv[4]}`,argv[5],argv[6],argv[7])
    break;
  case 'login':
    controller.hospitalLogin(argv[3],argv[4])
    break;
  case 'addPatient':
    controller.addPatient(argv[3],argv[4])
    break;
  case 'logout':
    controller.logoutUser()
    break;
}
