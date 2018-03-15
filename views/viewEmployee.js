class ViewEmployee {
    constructor(){

    }
    static list(data){
        for(let i=0; i<data.length; i++){
            console.log(`${data[i].username} ${data[i].password} ${data[i].role}`)
        }
    }

    static notifRegister(obj, dataLength){
        console.log(`Selamat, akun ${obj.username} sudah terdaftar. Total employee ${dataLength}`)
    }

    static notifLogin(data, username){
        if(data == true){
            console.log(`User ${username} logged in succesfully`)
        } else {
            console.log('Username / password wrong')
        }
        
    }
}

module.exports = ViewEmployee;