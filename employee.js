class Employee {
  constructor(objRegist) {
    this.name        = objRegist.name;
    this.username    = objRegist.username;
    this.password    = objRegist.password;
    this.role        = objRegist.role;
    this.loginStatus = false;
  }
}

module.exports = Employee;
