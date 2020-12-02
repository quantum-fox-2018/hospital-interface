const Controller = require('./controller.js');

const argv = process.argv;
const input = {
    argv1: argv[3],
    argv2: argv[4],
    argv3: argv[5],
};

if (argv[2] === 'register') {
    Controller.employeeRegistration(input.argv1, input.argv2, input.argv3);
} else if (argv[2] === 'login') {
    Controller.employeeLogin(input.argv1, input.argv2);
} else if (argv[2] === 'addPatient') {
    let diagnosis = []
    for (let i = 4; i < argv.length; i++) {
        diagnosis.push(argv[i]);
    }
    Controller.patients(input.argv1, diagnosis);
} else if (argv[2] === 'logout') {
    Controller.employeeLogout(input.argv1);
}