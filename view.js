class DisplayData{
  constructor(){
  }

  static displayRegisterDone(employee, totEmployee){
    console.log(`save data success {"username":"${employee.username}","password":"${employee.password}","role":${employee.position}}. Total employee : ${totEmployee}`)

  }

  static displayStatusLogin(statusLogin,statusUser){
    if(statusLogin === true){
      console.log(`user ${statusUser} logged in successfully`)
    }
    else {
      console.log(`username / password Salah:`)
    }

  }
}

module.exports = DisplayData
