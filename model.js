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

class Model{
    //Untuk proses selain getList
    static getDataEmployee(cb){
        fs.readFile('employee.json', 'utf8', function(err, dataEmployee){
            dataEmployee = JSON.parse(dataEmployee)
            cb(dataEmployee);
        });
    }

    static getDataPatient(cb){
        fs.readFile('patient.json', 'utf8', function(err, dataPatient){
            dataPatient = JSON.parse(dataPatient);
            cb(dataPatient);
        });
    }

    static writeFile(data, file, callback) {
        fs.writeFile(file, JSON.stringify(data), 'utf8', (err) =>{
            if(err){
                console.log(err); 
            }
        });
    }

    static register(input, callback){

        let username = input[0];
        let password = input[1];
        let role = input[2];

        Model.getDataEmployee(function(dataEmployee) {
            if(dataEmployee != undefined){
                let objEmployee = new Employee(username, role, username, password);
                dataEmployee.push(objEmployee);

                Model.writeFile(dataEmployee, './employee.json', function(str){
                    callback(str);
                })
            }else{
                let resultArr = [];
                let objEmployee = new Employee(username, role, username, password);
                resultArr.push(objEmployee);
                
                Model.writeFile(resultArr, './employee.json', function(str){
                    callback(str);
                })
                callback(`save data success ${dataEmployee[dataEmployee.length-1].name}. Total employee : ${dataEmployee.length}`) 
            }
        }) 
    }

    static checkLogin(dataEmployee){
        for(let index =0; index<dataEmployee.length; index++){
            if(dataEmployee[index].isLogin == true){
                return false;
            }
        }
        return true;
    }

    static login(input, callback){
        
        Model.getDataEmployee(function(dataEmployee){

            if(Model.checkLogin(dataEmployee)){
    
                for(let indexData =0; indexData<dataEmployee.length; indexData++){
                    if(input[0] == dataEmployee[indexData].username && input[1] == dataEmployee[indexData].password){
                        dataEmployee[indexData].isLogin = true;
                        callback(`user ${processedDataEmployee[indexData].username} logged in successfully`, cbController);
                    }
                }
    
                Model.writeFile(dataEmployee, './employee.json', function(){
                    
                })
    
                callback(`username/password wrong`, cbController);
            }else{
                callback('Someone is already logged in!', cbController);
            }
        })

    }

    static addPatient(input, callback){
        Model.getDataEmployee(function(dataEmployee){
            Model.getDataPatient(function(dataPatient){
                for(let employeeIndex = 0; employeeIndex<dataEmployee.length; employeeIndex++){
                    if(dataEmployee[employeeIndex].isLogin == true && dataEmployee[employeeIndex].position == 'dokter'){
                        if(dataPatient == undefined){
                            let arrPatient = [];
                            let patient = new Patient(input[0], 1, input.slice(1, input.length));
        
                            arrPatient.push(patient);
        
                            Model.writeFile(arrPatient, 'patient.json', function(){

                            })
                        }else{
                            let id = dataPatient.length-1;
                            let patient = new Patient(input[0], id, input.slice(2, input.length));
        
                            dataPatient.push(patient);
                            Model.writeFile(dataPatient, 'patient.json', function(){

                            })
                        }
                    }
                    callback(`data pasien berhasil ditambahkan. total data pasien : ${dataPatient.length}`);
                }
            })
        })
    }

    static logout (input, callback){
        Model.getDataEmployee(function(dataEmployee){
            for(let indexData = 0; indexData<dataEmployee.length; indexData++){
                if(input[0] == dataEmployee[indexData].name && dataEmployee[indexData].isLogin == true){
                    dataEmployee[indexData].isLogin = false;
                    callback(`user ${dataEmployee[indexData].name} successfully logged out`);
                }else if(input[0] == dataEmployee[indexData].name && dataEmployee[indexData].isLogin == false){
                    callback(`user ${input[0]} is not logged in yet`);
                }
            }
        })
    }
}

module.exports = Model;
  