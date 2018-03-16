class DisplayData{
  constructor(){
  }

  static displayRegisterDone(employee, totEmployee){
    console.log(`save data success {"username":"${employee.username}","password":"${employee.password}","role":${employee.position}}. Total employee : ${totEmployee}`)

  }
}

module.exports = DisplayData
