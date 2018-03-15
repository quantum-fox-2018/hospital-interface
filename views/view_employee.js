class ViewEmployee{
    constructor() {
        
    }

    static addSuccess(objEmployee, totalEmployee){
        console.log(`save data success : "${objEmployee.username }" \n Total Employee :  "${totalEmployee}"`)
    }

    static statusLogin(status, username){
        if(status == true){
            console.log(`User "${username}" logged in succesfully`)
        } else {
            console.log('username / password wrong')
        }
    }
}

module.exports = ViewEmployee