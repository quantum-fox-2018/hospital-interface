const fs = require('fs')
const Employee = require('./employee')
const Patient = require('./patient')
const AddEmployee = require('./model');
let data = fs.readFileSync('./employee.json','utf8')
var employeeData = JSON.parse(data)
let tambahData = new AddEmployee()

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command == 'register'){
      let newEmployee = new Employee(this.content[0],this.content[1],this.content[2],this.content[3])
      //console.log(employee);
      AddEmployee.addData(newEmployee)
    }else if(this.command == 'daftarPasien'){
      let patient = new Patient(this.content[0],this.content[1],this.content[2],this.content[3])
      console.log(patient);
    }else if(this.command = 'login'){
      //console.log(this.content);
      AddEmployee.login(this.content)
    }

  }

  static employeeData(){
    AddEmployee.addData(function(anying){})
  }



}

let controller = new Controller

module.exports = Controller
