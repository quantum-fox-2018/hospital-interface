const Controller = require('./controller.js');

class View {
    static registration(statusMessage, objEmployee, totalEmployee) {
        console.log(`${statusMessage} ${JSON.stringify(objEmployee)}. Total employee ${totalEmployee}`);
    }

    static login(statusMessage, loggedUser) {
        try {
            if (loggedUser.status === false) {
                console.log(`username / password wrong`);
            } else {
                console.log(`user ${loggedUser.name} ${statusMessage}`);
            }   
        } catch (error) {
            console.log(`username / password wrong`);
        }
    }

    static patientLog(statusMessage, dataPatient) {
        if (dataPatient.position !== 'dokter' && dataPatient.status === true || dataPatient.status === false) {
            console.log(statusMessage);
        } else {
            console.log(`${statusMessage}. Total data pasien: ${dataPatient.length}`);
        }
    }

    static logout(statusMessage) {
        console.log(statusMessage);
    }
}

module.exports = View;