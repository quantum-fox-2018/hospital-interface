const Controller = require('./controller.js')
var argv = process.argv

switch(argv[2]) {

    case 'register':
    Controller.addData(argv[3],argv[4],argv[5])
    break;
    case 'login':
    Controller.login(argv[3],argv[4])
    case 'addPatien':
    Controller.addPatien(argv[3],argv[4],argv[5])
}

// if (argv[2] === "register") {

    
// }