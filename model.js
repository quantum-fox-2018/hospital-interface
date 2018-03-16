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
    let employee = new Employee(dataUser.name, dataUser.username, dataUser.password, dataUser.position)
    dataEmployee.push(employee)
    fs.writeFile('./employee.json',JSON.stringify(dataEmployee, null, 2), (err, data) => {
      let totEmployee = dataEmployee.length
      cb2(employee, totEmployee)
    })
  }

  static cekData(datalogin, cb){
    // console.log(`${datalogin.username} ${datalogin.password}`)
    fs.readFile('./employee.json','utf8',(err, dataEmployee) => {
      // console.log(dataEmployee)
      // console.log(JSON.parse(dataEmployee).length)
      let objEmployee = JSON.parse(dataEmployee)
      let flagCekUser = false
      let flagUser = ''
      for(let i=0; i<objEmployee.length; i++){
        if(objEmployee[i].username === datalogin.username && objEmployee[i].password === datalogin.password ){
          // console.log(`user ${datalogin.username} logged in successfully`)
          flagCekUser = true
          flagUser = objEmployee[i].username
        }
      }
      // console.log(flagCekUser)
      cb(flagCekUser, flagUser)
    })
  }


}

// Data.writeFile({name:'rani', password:12312312, role:'dokter'})

module.exports = Data
