/*jshint esversion:6*/

class View {
  static registerView(name, position, username, password, listDataLength) {
    console.log(`save data sukses ${name} ${position} ${username} ${password}. Total karyawan adalah ${listDataLength}`);
  }
  static loginEmployeeView(loginCondition, username) {
    if (loginCondition == true) {
      console.log(`${username} logged in successfully`);
    } else {
      console.log(`username/ password wrong`);
    }
  }
  static dataPatientView(listDataPatientLength, loginCondition) {
    if (loginCondition == true) {
      console.log(`data pasien berhasil ditambahkan. Total data pasien : ${listDataPatientLength}`);
    } else {
      console.log(`tidak memiliki akses untuk add patient`);
    }
  }
  static logoutEmployeeView(logoutCondition) {
    if (logoutCondition == true) {
      console.log(`logged out successfully`);
    }
  }
}

module.exports = View;
