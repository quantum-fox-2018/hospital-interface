const Controller = require('./controller.js');

class View {
    static registration(data) {
        console.log(`save data succes {"username":${data[0].username}, "password":${data[0].password}, "role":${data[0].position}}. Total employee ${data[1]}`);
    }
}

module.exports = View;