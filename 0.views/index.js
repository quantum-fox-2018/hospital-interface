class View {

    static registerEmployee(new_input,new_employee_list) {
        let arrEmployeeList = JSON.parse(new_employee_list);
        console.log(`Save data success {"username":"${new_input.username}","password":"${new_input.password}","role":"${new_input.position}"}. Total employee: ${arrEmployeeList.length} `);
    }

    static loginEmployee(comment) {
        console.log(comment);
    }

    static addPatient(comment) {
        console.log(comment)
    }

}

module.exports = View