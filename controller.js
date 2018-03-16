
const model = require('./model.js')
const view = require('./view.js')
class Controller {
  static registerEmployee(name, position, username, password) {
      model.addData(name, position, username, password,employees =>{
      view.print(employees)
      })
  }
  static hospitalLogin(username, password){
    //console.log(username, password)
    model.statusLogin(username, password, strLogin =>{
    view.print(strLogin)
    })
  }
  static addPatient(name, penyakit){
    model.tambahDataPatient(name,penyakit, strTambahPatient =>{
    view.print(strTambahPatient)
    })
  }
  static logoutUser(){
    model.saveLogout(strLogout =>{
    view.print(strLogout)
    })
  }
}

module.exports = Controller
