const fs = require('fs');

const Employee = require('../models/modelEmployee');
const Patient = require('../models/modelPatient')

class Model {
    static listEmployee(callback){
      let data = fs.readFileSync('./employee.json', 'utf8');
      let dataEmploye = JSON.parse(data)
  
      callback(dataEmploye)
    }

    static registerEmployee(username, password, position, callback){
      let data = fs.readFileSync('./employee.json', 'utf8');
      let dataEmploye = JSON.parse(data)
      
      let newEmploye = new Employee('', position, username, password)
      dataEmploye.push(newEmploye)
  
      let newData = JSON.stringify(dataEmploye, null, 2)
      fs.writeFileSync('./employee.json', newData)
  
      callback(newEmploye, dataEmploye.length)
    }

    static login(username, password, callback){
        let data = fs.readFileSync('./employee.json', 'utf8');
        let dataEmploye = JSON.parse(data)

        for(let i=0; i<dataEmploye.length; i++){
            if(dataEmploye[i].username == username && dataEmploye[i].password == password){
                dataEmploye[i].statusLogin = true;
            } else {
                dataEmploye[i].statusLogin = false;
            }
        }

        let newData = JSON.stringify(dataEmploye, null, 2);
        fs.writeFileSync('./employee.json', newData);

        for(let i=0; i<dataEmploye.length; i++){
            if(dataEmploye[i].username == username && dataEmploye[i].password == password){
                if(dataEmploye[i].statusLogin == true){
                    return callback(true, dataEmploye[i].username)
                }
            }
        }
        return callback(false)
    }

    static dokterAccessInputPatient(patientName, argvArray){
        let data1 = fs.readFileSync('./employee.json', 'utf8');
        let dataEmploye = JSON.parse(data1)

        for(let i=0; i<dataEmploye.length; i++){
            if(dataEmploye[i].statusLogin == true && dataEmploye[i].position == 'dokter'){
                return this.addPatient(patientName, argvArray)
            }
        }
        console.log('Tidak memiliki akses untuk add Pasien !');
        
    }

    static addPatient(patientName, argvArray){
        let data = fs.readFileSync('./patient.json', 'utf8');
        let data1 = fs.readFileSync('./employee.json', 'utf8');
        
        let dataPatient = JSON.parse(data)
        let dataEmploye = JSON.parse(data1)

        let id;
        if(dataPatient.length == 0){
            id = 1;
        } else {
            id = dataPatient[dataPatient.length-1].id+1;
        }
        
        let newPatient = new Patient(id, patientName, argvArray)
        dataPatient.push(newPatient)
        
        let newData = JSON.stringify(dataPatient, null, 2);
        fs.writeFileSync('./patient.json', newData)
    }

    static logout(){
        let data = fs.readFileSync('./employee.json', 'utf8');
        let dataEmploye = JSON.parse(data)

        for(let i=0; i<dataEmploye.length; i++){
            dataEmploye[i].statusLogin = false;
        }

        let newData = JSON.stringify(dataEmploye, null, 2);
        fs.writeFileSync('./employee.json', newData);
    }

}

module.exports = Model;