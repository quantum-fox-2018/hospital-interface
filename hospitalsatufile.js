const fs = require('fs')

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
  saveDataEmployee(employee) {
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
          var listEmployeeSave = JSON.parse(data)
          //console.log(employee);
          listEmployeeSave.push(employee)
          fs.writeFile('./employee.json',JSON.stringify(listEmployeeSave,null,2), (err) => {
          if (err) throw err;
          console.log(`save data success ${employee.username}. Total employee : ${listEmployeeSave.length}`);
        });
    });
  }
  registerEmployee(name, position, username, password){
      let employee = new Employee (name, position, username, password)
      return employee
  }
  hospitalLogin(username, password){
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
          var listEmployeeSave = JSON.parse(data)
          var logedIn = false
          let counter = 0
          for(let i = 0; i < listEmployeeSave.length; i++){
            if(listEmployeeSave[i].login === true){
              console.log(`gak bisa login, user ${listEmployeeSave[i].username} masih login`);
            }
            counter ++
          }
          console.log(counter)
          console.log(listEmployeeSave.length)
          if(counter === listEmployeeSave.length){
            for(let i = 0; i< listEmployeeSave.length; i++){
                if(password === listEmployeeSave[i].password && username === listEmployeeSave[i].username){
                  logedIn = true
                  listEmployeeSave[i].login = true
                  console.log(`user ${listEmployeeSave[i].username} logged in successfully`)
                  fs.writeFile('./employee.json',JSON.stringify(listEmployeeSave,null,2), (err) => {
                  if (err) throw err;

                });
              }
            }
            if(logedIn === false){
              console.log('wrong password or username')
            }
          }
    });
  }
  addPatient(no, name, penyakit){
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
                    console.log(listPatients.length)
                    if(listPatients.length === 0){
                      idPatient = 1
                    }else {
                      idPatient = listPatients[listPatients.length -1].id +1
                    }
                    let tambahPasien = new Patient (idPatient,name, penyakit)

                    listPatients.push(tambahPasien)
                    fs.writeFile('./patient.json',JSON.stringify(listPatients,null,2), (err) => {
                    if (err) throw err;
                    console.log(`save data patiens success ditambahkan. Total patient : ${listPatients.length}`);
                  });
              });
            }else{
              console.log(`akses ditolak anda ${listEmployeeSave[i].position}`)
            }
          }else{
            counter ++
          }          
        }
        if(counter === listEmployeeSave.length){
          console.log('anda belum login, silakan login')
        }
    });
  }
  logoutUser(){
    fs.readFile('./employee.json','utf8', (err, data) => {
      if (err) throw err;
        var listEmployeeSave = JSON.parse(data)
        let counter = 0
        for(let i = 0; i< listEmployeeSave.length; i++){
          if(listEmployeeSave[i].login === true){
            listEmployeeSave[i].login = false
            console.log(`user ${listEmployeeSave[i].username} logged out successfully`)
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

let argv = process.argv
let regist = new Hospital()
switch (argv[2]) {
  case 'register':
    regist.registerEmployee(`${argv[2]} ${argv[3]}`,argv[4],argv[5],argv[6])
    regist.saveDataEmployee(regist)
    break;
  case 'login':
    regist.hospitalLogin(argv[3],argv[4])
    break;
  case 'addPatient':
   regist.addPatient(argv[3],argv[4])
   break;
   case 'logout':
     regist.logoutUser()
     break;
}

// if(argv[2] === undefined){
//   console.log('input firtname, lastname, jabatan, username, password')
// }else{
//
// }



// let regist2 = new RegisterData()
// regist1.registerEmployee('Scarlett Johansson','dokter','scarJ','scj02')
// let regist3 = new RegisterData()
// regist1.registerEmployee('Astahiam Sudoso','receptionist','assudoso','asta034')

//
// let employee = new Employee('Abraham John','admin','abrahamj','aj01')
// let employee2 = new Employee('Scarlett Johansson','dokter','scarJ','scj02')
// let employee3 = new Employee('Astahiam Sudoso','receptionist','assudoso','asta034')
