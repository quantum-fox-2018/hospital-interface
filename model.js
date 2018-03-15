/*jshint esversion:6*/
const fs = require ('fs');

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
  }
}

class Model {

  static bacaData(){
    let listData =JSON.parse(fs.readFileSync('./employee.json', 'utf8'));
    return listData;
  }

  static nambahData(name, position, username, password){
    let listData = Model.bacaData();
    let newEmployee = new Employee(name, position, username, password);
    listData.push(newEmployee);

    Model.TulisData(JSON.stringify(listData));
    return listData;
  }

  static TulisData (data){
    fs.writeFileSync('./employee.json',data,'utf8');
  }

}


module.exports = Model;
