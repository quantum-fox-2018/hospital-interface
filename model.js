'use strict'
class HospitalModel{
  constructor() {
    this.name = 'Rumah Sakit Harapan Jaya'
    this.employees = []
    this.patients = []
    this.location = 'Cirebon'
  }

  addEmployee(arrEmployee){
    for (let i = 0; i < arrEmployee.length; i++) {
      this.employees.push(arrEmployee[i])
    }
  }

  addPatient(arrPatient){
    for (let i = 0; i < arrPatient.length; i++) {
      this.patients.push(arrPatient[i])
    }
  }


}

class PatientModel{
  constructor(name, diagnosis) {
    this.id = 0
    this.name = name
    this.diagnosis = diagnosis
  }
}

class EmployeeModel{
  constructor(name,username, password,position) {
    this.name = name
    this.username = username
    this.password = password
    this.position = position
    this.statusLogin = false

  }
}

module.exports = {
  HospitalModel,PatientModel,EmployeeModel
}
