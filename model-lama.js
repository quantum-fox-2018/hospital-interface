const Employee = require('./hospital');
const fs = require('fs');

class Data{
  constructor(){
  }

  static addData(dataUser, cb, cb2){
    fs.readFile('./employee.json','utf8',(err, dataEmployee) => {
      cb(dataUser, JSON.parse(dataEmployee), cb2)
    })
  }

  static tulisKeFile(dataUser, dataEmployee, cb2){
    let employee = new Employee(dataUser.name, dataUser.password, dataUser.position)
    dataEmployee.push(employee)
    fs.writeFile('./employee.json',JSON.stringify(employee, null, 2), (err, data) => {
      cb2(employee)
    })

  }


}

// Data.writeFile({name:'rani', password:12312312, role:'dokter'})

module.exports = Data
