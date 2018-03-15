"use strict"
const fs = require('fs');
const employees = './listOfEmployee.json';
const logInfo = './userLog.json';
const patients = './patient.json';

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

class Model {
  static readFileEmployee() {
    let dataOfEmployee = JSON.parse(fs.readFileSync(employees, 'utf8'));

    return dataOfEmployee;
  }

  static readFileUserLog() {
    let dataOfUserLog = JSON.parse(fs.readFileSync(logInfo, 'utf8'));

    return dataOfUserLog;
  }

  static readFilePatient() {
    let dataOfPtient = JSON.parse(fs.readFileSync(employees, 'utf8'));

    return dataOfPtient;
  }

  static writeFileEmployee(data) {
    let stringify = JSON.stringify(data);
    let employeeData = fs.writeFileSync(employees, stringify);
  }

  static writeFileUserLog(data) {
    let stringify = JSON.stringify(data);
    let userLogData = fs.writeFileSync(logInfo, stringify);
  }

  static writeFilePatient(data) {
    let stringify = JSON.stringify(data);
    let patient = fs.writeFileSync(patients, stringify);
  }

  static addEmployee(name, position, password) {
    let employee = new Employee(name, position, name, password);
    let arrayOfEmployee = Model.readFileEmployee();
    arrayOfEmployee.push(employee);
    Model.writeFileEmployee(arrayOfEmployee);
    let totalEmployee = arrayOfEmployee.length;
    return [employee, totalEmployee];
  }
}

module.exports = {
  Hospital,
  Patient,
  Employee,
  Model
};