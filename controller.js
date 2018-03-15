/*jshint esversion:6*/

const Model = require('./model.js');
const View = require('./view.js');
class Controller{
  static registerData(name, position, username, password){
    let listData = Model.nambahData(name, position, username, password);
    View.viewRegister(listData,name, position);
  }


}

module.exports = Controller;
