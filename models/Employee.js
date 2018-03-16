class Employee {
  constructor(data) {
    this.username = data.username
    this.password = data.password
    this.role = data.role
    this.statusLogin = data.statusLogin
  }
}

module.exports = Employee