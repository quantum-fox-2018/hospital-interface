// const Controller = require('./controller.js');

class View {
  constructor() {

  }

  static showDataEmployee(username, password, role, listDataEmployee) {
    var listDataLength = listDataEmployee.length
    console.log(`save data success ${username} ${password} ${role}. jumlah pegawai = ${listDataLength}`);
  }

  static showLoginStatus(username, loginStatus) {
    if (loginStatus == true) {
      console.log(`user ${username} successful login`)
    } else {
      console.log(`user ${username} failed`)
    }
  }

  static successAdd(name, diagnosis, statusPatient) {
    if (statusPatient == true) {
      console.log(`data pasien berhasil ditambahkan`)
    } else {
      console.log(`tidak memiliki akses untuk add pasien`)
    }
  }
}

module.exports = View;
