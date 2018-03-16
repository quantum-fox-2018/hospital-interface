const fs = require('fs');
const employee = require('./modelEmployee');
const patient = require('./modelPatient');

class Model {

    // static showEmployee() {
    //     let readEmployee = fs.readFile("./0.models/employee.json", (err, data) => {
    //         if (err) throw err;
    //         let read_JSONdata = JSON.parse(data); // arr obj
    //         console.log(read_JSONdata);
    //     });
    // }

    static registerEmployee(input_data, view) {
       
        // READ FILE
        let readEmployee = fs.readFile("./0.models/employee.json", (err, data) => {
            if (err) throw err;
            let employee_list = JSON.parse(data); // arr obj
        
            // WRITE FILE
            let name = input_data[0];
            let position = input_data[1];
            let username = input_data[2];
            let password = input_data[3];
            let new_input = new employee(name,position,username,password);

            employee_list.push(new_input);
            let new_employee_list = JSON.stringify(employee_list,null,2);

            let writeEmployee = fs.writeFile("./0.models/employee.json", new_employee_list, (err) => {
                if (err) throw err;
                
                view.registerEmployee(new_input,new_employee_list);

            })
        });
    }


    static loginEmployee(input_data, view) {
        let username = input_data[0];
        let password = input_data[1];

        // READ FILE
        let readEmployee = fs.readFile("./0.models/employee.json", (err, data) => {
            if (err) throw err;
            let employee_list = JSON.parse(data); // arr obj
            
            let comment = 'username / password is wrong';
            let status = true;
            for (let i = 0; i < employee_list.length; i++) {
                if (username == employee_list[i].username && password == employee_list[i].password && status) {
                    comment = `user ${username} login successfully`;
                    employee_list[i].loginStatus = true;
                    status = false;
                } 
            }
            
            // WRITE FILE
            let new_employee_list = JSON.stringify(employee_list,null,2);
            let writeEmployee = fs.writeFile("./0.models/employee.json", new_employee_list, (err) => {
                if (err) throw err;      
                view.loginEmployee(comment);            
            });
        });
    }


    static addPatient(input_data, view) {
        // READ FILE EMPLOYEE
        let readEmployee = fs.readFile("./0.models/employee.json", (err, data) => {
            if (err) throw err;
            let employee_list = JSON.parse(data); // arr obj
            // console.log(employee_list);

            let approvalStatus = true;
            let comment = `Tidak memiliki akses untuk add patient`;
            for (let i = 0; i < employee_list.length; i++) {

                if (employee_list[i].position == 'Docter' && employee_list[i].loginStatus == true && approvalStatus) {
                    
                    // READ FILE
                    let readPatient = fs.readFile("./0.models/patients.json", (err, data) => {
                        if (err) throw err;
                        let patients_list = JSON.parse(data); // arr obj
                        // console.log(patients_list)
                        
                        // WRITE FILE
                        let id = input_data[0];
                        let name = input_data[1];
                        let diagnosis = input_data[2];
                        let new_input = new patient(id,name,diagnosis);
                        
                        patients_list.push(new_input);
                        let new_patients_list = JSON.stringify(patients_list,null,2);
                        
                        let writePatients = fs.writeFile("./0.models/patients.json", new_patients_list, (err) => {
                            if (err) throw err;
                            // console.log(new_patients_list);
                        })
                    })

                    //READ FILE AGAIN
                    let readPatient1 = fs.readFileSync("./0.models/patients.json", 'utf8');
                    let patients_list = JSON.parse(readPatient1);
                    comment = `Data pasien berhasil ditambahkan. Total data pasien: ${patients_list.length+1}`;
                    approvalStatus = false;
                } 
            }
            view.addPatient(comment);
        })
    }


}

module.exports = Model;