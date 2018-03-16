
const Employee = require('./employee')
const Patient = require('./patient')

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command == 'Register'){
      let employee = new Employee(this.content[0],this.content[1],this.content[2],this.content[3])
      console.log(employee);
    }else if(this.command == 'daftarPasien'){
      let patient = new Patient(this.content[0],this.content[1],this.content[2],this.content[3])
      console.log(patient);
    }
  }
}

let controller = new Controller

module.exports = Controller
