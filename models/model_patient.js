const fs =  require('fs')

class ModelPatient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

}

// ModelPatient.addPatient('kang tatang', 'sakit perut')

module.exports = ModelPatient