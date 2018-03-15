const fs = require('fs');


class ModelEmployee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }

    static registerEmployee(username, password, position, callback){
        fs.readFile('./employee.json', (err, data) => {
            if(err){
                console.log(err)
            }
            let employee_data = JSON.parse(data)
            // console.log(employee_data)
            let newEmployee = new ModelEmployee(username, position, username, password)
            employee_data.push(newEmployee)
            // console.log(newEmployee)

            fs.writeFile('./employee.json', JSON.stringify(employee_data, null, 2), (err) => {
                if(err){
                    console.log(err)
                }
                callback(newEmployee, employee_data.length)
            })
        })
    }

    static checkLogin(username, password, callback){
        fs.readFile('./employee.json', (err, data) => {
            if(err){
                console.log(err)
            }
            let employee_data = JSON.parse(data)
            let status = false
            let dataLogin = []
            for(let i=0; i<employee_data.length; i++){
                if(employee_data[i].username == username && employee_data[i].password == password){
                    status = true
                    dataLogin.push(employee_data[i])
                    callback(status, username)
                }
            }
            if(status == false){
                callback(status)
            }
            fs.writeFile('./data_login.json', JSON.stringify(dataLogin, null, 2),(err, data) => {
                if(err){
                    console.log(err)
                }
            })
        })
    }

}

// ModelEmployee.registerEmployee('agung prabowo','dokter','agung','123456')

module.exports = ModelEmployee