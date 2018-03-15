const Controller = require('./controller.js');

const argv = process.argv;

if (argv[2] === 'register') {
    Controller.employeeRegistration(argv[3], argv[4], argv[5]);
}