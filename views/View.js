class View {
  static printLine(string) {
    console.log(string)
  }

  static statusLogin(status, name) {
    if(status == 1) {
      console.log(`username / password wrong`)
    } else if(status == 2) {
      console.log(`user ${name} logged in successfully`)
    } else if(status == 3) {
      console.log('kamu sudah logged in')
    }
  }

  static statusLogout(status, name) {
    if(status == 1) {
      console.log(`username salah`)
    } else if(status == 2) {
      console.log(`user ${name} logged out successfully`)
    } else if(status == 3) {
      console.log(`user ${name} sudah logged out`)
    }
  }
}

module.exports = View