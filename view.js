class Views {
  static registerView(employee, num){
    console.log(`Save data success ${employee}. Total employee: ${num}`)
  }

  static loginView(status,name){
    if(status==true){
      console.log(`user ${name} login successfully`)
    } else {
      console.log(`username/password wrong`)
    }
  }
}

module.exports = Views
