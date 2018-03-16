let fs = require('fs');
let Controller = require('./controller.js');

class Hospital {
    constructor(name, location) {
      this.name = name
      this.employees = []
      this.patients = []
      this.location = location
    }
}
  
class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = [];
    }
}
  
class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = false;
    }
}

class Dokter extends Employee{
    constructor(name, position, username, password){
        super(name, position, username, password);
    }
}

class Admin extends Employee{
    constructor(name, position, username, password){
        super(name, position, username, password);
    }
}

// class Receptionist extends Employee{
//     constructor(){
//         super();
//     }
// }

// class OfficeBoy extends Employee{
//     constructor(){
//         super();
//     }
// }

class Model{
    static employeesProcess(input, cbEmployee){
        fs.readFile('employee.json', 'utf8', function(err, dataEmployee){
            cbEmployee(input, dataEmployee);
        });
    }

    static patientProcess(input, cbEmployee, cbPatient){
        fs.readFile('patient.json', 'utf8', function(err, dataPatient){
            cbPatient(input, cbEmployee, dataPatient);
        });
    }

    static employeeToAddPatient(input, cbEmployee, dataPatient){
        fs.readFile('employee.json', 'utf8', function(err, dataEmployee){
            cbEmployee(input, dataEmployee, dataPatient);
        });
    }

    static list(input, dataEmployee){
        Controller.sendToView(dataEmployee);
    }

    static register(input, dataEmployee){

        let username = input[0];
        let password = input[1];
        let role = input[2];

        if(dataEmployee == undefined){
            let resultArr = [];

            if(role == 'dokter'){
                let dokter = new Dokter(username, role, username, password);
                resultArr.push(dokter);
            }else if(role == 'admin'){
                let admin = new Admin(username, role, username, password);
                resultArr.push(admin);
            }

            fs.writeFile('employee.json', JSON.stringify(resultArr), 'utf8', (err) =>{
                if(err){
                    console.log(err)
                }
            });

            Controller.sendToView(`save data success ${resultArr[resultArr.length-1].name}. Total employee : ${resultArr.length}`);
        }else{
            let processedDataEmployee = JSON.parse(dataEmployee);
            
            if(role == 'dokter'){
                let dokter = new Dokter(username, role, username, password);
                processedDataEmployee.push(dokter);
            }else if(role == 'admin'){
                let admin = new Admin(username, role, username, password);
                processedDataEmployee.push(admin);
            }
            fs.writeFile('employee.json', JSON.stringify(processedDataEmployee), 'utf8', (err) =>{
                if(err){
                    console.log(err); 
                }
            });

            Controller.sendToView(`save data success ${processedDataEmployee[processedDataEmployee.length-1].name}. Total employee : ${processedDataEmployee.length}`);
        }
        

        
    }

    static checkLogin(processedDataEmployee){
        for(let index =0; index<processedDataEmployee.length; index++){
            if(processedDataEmployee[index].isLogin == true){
                return false;
            }
        }

        return true;
    }

    static login(input, dataEmployee){
        let processedDataEmployee = JSON.parse(dataEmployee);

        if(Model.checkLogin(processedDataEmployee)){

            for(let indexData =0; indexData<processedDataEmployee.length; indexData++){
                if(input[0] == processedDataEmployee[indexData].username && input[1] == processedDataEmployee[indexData].password){
                    processedDataEmployee[indexData].isLogin = true;
                    Controller.sendToView(`user ${processedDataEmployee[indexData].username} logged in successfully`);
                }
            }

            fs.writeFile('employee.json', JSON.stringify(processedDataEmployee), 'utf8', (err) =>{
                if(err){
                    console.log(err); 
                }
            });

            Controller.sendToView(`username/password wrong`);
        }else{
            Controller.sendToView('Someone is already logged in!');
        }
    }

    static addPatient(input, dataEmployee, dataPatient){
        let processedDataEmployee = JSON.parse(dataEmployee);
        let processedDataPatient = JSON.parse(dataPatient);

        for(let employeeIndex = 0; employeeIndex<processedDataEmployee.length; employeeIndex++){
            if(processedDataEmployee[employeeIndex].isLogin == true && processedDataEmployee[employeeIndex].position == 'Dokter'){
                if(processedDataPatient == undefined){
                    let arrPatient = [];
                    let patient = new Patient(input[0], input[1], input.slice(2, input.lenght));

                    arrPatient.push(patient);

                    fs.writeFile('patient.json', JSON.stringify(arrPatient), 'utf8', (err) =>{
                        if(err){
                            console.log(err);
                        }
                    })
                }else{
                    let patient = new Patient(input[0], input[1], input.slice(2, input.lenght));

                    processedDataPatient.push(patient);
                    fs.writeFile('patient.json', JSON.stringify(processedDataPatient), 'utf8', (err) =>{
                        if(err){
                            console.log(err);
                        }
                    })
                }
            }
        }

    }

    static logout (input, dataEmployee){
        
    }
    

}

module.exports = Model;
  