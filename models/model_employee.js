const fs = require('fs');


class ModelEmployee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }

}

// ModelEmployee.registerEmployee('agung prabowo','dokter','agung','123456')

module.exports = ModelEmployee