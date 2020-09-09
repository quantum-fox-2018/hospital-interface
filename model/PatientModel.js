const fs = require('fs')

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }
}

module.exports = Patient
