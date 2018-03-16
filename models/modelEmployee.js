class Employee {
    constructor(name, position, username, password) {
        this.username = username
        this.password = password
        this.name = name
        this.position = position
        this.statusLogin = false
    }
}

module.exports = Employee;