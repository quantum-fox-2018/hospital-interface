'use strict'

class EmployeeModel{
  constructor(name,username,password,position) {
    this.name = name
    this.username = username
    this.password = password
    this.position = position
    this.statusLogin = false
  }

}

module.exports = EmployeeModel
