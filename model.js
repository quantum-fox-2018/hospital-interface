const fs = require('fs');

class Hospital {
  constructor(name, location, employees, patients) {
    this._name = name
    this._employees = employees
    this._patients = patients
    this._location = location
  }

  set employees(value) {
    this._employees.push(value);
  }

  get employees() {
    return this._employees;
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this._id = id
    this._name = name
    this._diagnosis = diagnosis
  }

  addPatient() {

  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this._position = position
    this._username = username
    this._password = password
  }

  register(name, password, role) {
    this._username = name;
    this._password = password;
    this._position = role;

    Hospital.employees = this;
    let result = `save data success ${this}. Total employee : ${Hospital.employees.length}`;

    return result;
  }
}

class Admin extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password);
  }
}

class OfficeBoy extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password);
  }
}

class Receptionist extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password);
  }
}

class Docter extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password);
  }
}

module.exports = {
  Hospital,
  Patient,
  Employee
}
