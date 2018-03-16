const Data = require('./model');
const DisplayData = require('./view');

class File{
  constructor(){
  }

  static tambahData(dataUser){
    Data.addData(dataUser, Data.tulisKeFile, File.lemparData)
  }

  static lemparData(employee, totEmployee){
    // console.log('udah mau lempar data nih ', employee)
    DisplayData.displayRegisterDone(employee, totEmployee)
  }

  static cekLogin(datalogin){
    Data.cekData(datalogin, File.lemparStatus)
  }

  static lemparStatus(flagStatusCb, flagUserCb){
    // console.log('cb berhasil', flagdariCb)
    DisplayData.displayStatusLogin(flagStatusCb, flagUserCb)
  }

}


module.exports = File
