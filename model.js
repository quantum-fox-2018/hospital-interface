const fs = require('fs')
const controller = require('./controller.js')
class Model{
  static addData(name, position, username, password,callback){
    let employee = new Employee (name, position, username, password)
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
          var listEmployeeSave = JSON.parse(data)
          //console.log(employee);
          listEmployeeSave.push(employee)
          fs.writeFile('./employee.json',JSON.stringify(listEmployeeSave,null,2), (err) => {
          if (err) throw err;
          callback(`save data success ${employee.username}. Total employee : ${listEmployeeSave.length}`);
        });
    });
  }
  static statusLogin(username, password, callback){
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
          var listEmployeeSave = JSON.parse(data)
          var logedIn = false
          let counter = listEmployeeSave.length
          for(let i = 0; i < listEmployeeSave.length; i++){
            if(listEmployeeSave[i].login === true){
              callback(`gak bisa login, user ${listEmployeeSave[i].username} masih login`);
              counter --
            }
          }
          if(counter === listEmployeeSave.length){
            for(let i = 0; i< listEmployeeSave.length; i++){
                if(password === listEmployeeSave[i].password && username === listEmployeeSave[i].username){
                  logedIn = true
                  listEmployeeSave[i].login = true
                  callback(`user ${listEmployeeSave[i].username} logged in successfully`)
                  fs.writeFile('./employee.json',JSON.stringify(listEmployeeSave,null,2), (err) => {
                  if (err) throw err;

                });
              }
            }
            if(logedIn === false){
              callback('wrong password or username')
            }
          }
    });
  }
  static tambahDataPatient(name, penyakit, callback){
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
        var listEmployeeSave = JSON.parse(data)
        let counter = 0
        for(let i = 0; i< listEmployeeSave.length; i++){
          if(listEmployeeSave[i].login === true){
            //cek user
            if(listEmployeeSave[i].position === 'dokter'){
              fs.readFile('./patient.json','utf8', (err, data) => {
                if (err) throw err;
                    var listPatients = JSON.parse(data)
                    var idPatient = 0
                    if(listPatients.length === 0){
                      idPatient = 1
                    }else {
                      idPatient = listPatients[listPatients.length -1].id +1
                    }
                    let tambahPasien = new Patient (idPatient,name, penyakit)

                    listPatients.push(tambahPasien)
                    fs.writeFile('./patient.json',JSON.stringify(listPatients,null,2), (err) => {
                    if (err) throw err;
                    callback(`save data patiens success ditambahkan. Total patient : ${listPatients.length}`);
                  });
              });
            }else{
              callback(`akses ditolak anda ${listEmployeeSave[i].position}, bukan dokter`)
            }
          }else{
            counter ++
          }
        }
        if(counter === listEmployeeSave.length){
          callback('anda belum login, silakan login')
        }
    });
  }
  static saveLogout(callback){
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
        var listEmployeeSave = JSON.parse(data)
        let counter = 0
        for(let i = 0; i< listEmployeeSave.length; i++){
          if(listEmployeeSave[i].login === true){
            listEmployeeSave[i].login = false
            callback(`user ${listEmployeeSave[i].username} logged out successfully`)
            fs.writeFile('./employee.json',JSON.stringify(listEmployeeSave,null,2), (err) => {
            if (err) throw err;

          });
          }
        }
    });
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = false
  }
}

module.exports = Model
