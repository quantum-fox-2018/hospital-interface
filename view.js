class Views {
  static registerView(employee, num){
    console.log(`Save data success {username:${employee.username},role:${employee.position}}. Total employee: ${num}`)
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
