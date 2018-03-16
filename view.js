const Controller = require('./controller.js');

class View {
  constructor(){

  }

  static save_data_success(obj, total){
    let newData   = JSON.stringify(obj);
    let totalData = total.length;
    console.log(`save data sukses ${newData}. Total employee : ${totalData}`);
  }

  static save_data_patient(obj, total){
    let newData   = JSON.stringify(obj);
    let totalData = total.length;
    console.log(`data pasien berhasil ditambahkan. Total data pasien : ${totalData}`);
  }

  static loginFeature(boolean, username){
    if(boolean === true){
      console.log(`user ${username} logged in successfully`);
    } else {
      console.log('username / password wrong');
    }
  }
}

module.exports = View;
