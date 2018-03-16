const Controller = require('./controller.js');

class View {
    static registration(statusMessage, objEmployee, totalEmployee) {
        console.log(`${statusMessage} ${JSON.stringify(objEmployee)}. Total employee ${totalEmployee}`);
    }

    static login(statusMessage, loggedUser) {
        if (loggedUser.status === false) {
            console.log(`username / password wrong`);
        } else {
            console.log(`user ${loggedUser.name} ${statusMessage}`);
        }
    }
}

module.exports = View;