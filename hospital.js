class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
}

class Employee {
  constructor(name, username, password, position) {
    this.name = name
    this.username = username
    this.password = password
    this.position = position
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

module.exports = Employee
