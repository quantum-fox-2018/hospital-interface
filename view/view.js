class Views {
  static help(){
    console.log(`node app.js help`)
    console.log(`node app.js employeeList`)
    console.log(`node app.js register <name> <position> <username> <password>`)
    console.log(`node app.js login <username> <password>`)
    console.log(`node app.js addPatient <name> <diagnosis>`)
    console.log(`node app.js logout`)
  }

  static listView(input){
    var Table = require('cli-table');
    var table = new Table({
      head: ['No','Name','Role']
    })
    for(let i=0; i<input.length; i++){
      table.push(
        [(input[i].id),input[i].name,input[i].position]
      )
    }
    console.log(table.toString());
  }

  static registerView(employee, num){
    console.log(`Save data success {username:${employee.username}, role:${employee.position}}. Total employee: ${num}`)
  }

  static loginView(status,name){
    if(status==true){
      console.log(`user ${name} login successfully`)
    } else {
      console.log(`username/password wrong`)
    }
  }

  static addPatientView(status,num){
    if(status==true){
      console.log(`Data pasien berhasil ditambahkan. Total data pasien ${num}`)
    } else {
      console.log(`Tidak memiliki akses untuk add patient`)
    }
  }

  static logoutView(){
    console.log(`user logout successfully`)
  }
}

module.exports = Views
