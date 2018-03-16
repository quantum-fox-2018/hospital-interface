var Table = require('cli-table');


class ViewEmployee {
    constructor(){

    }
    static list(data){
        let table = new Table({
            head: ['No','Username','Password','Position','Status'],
            colWidths: [8,15,13,20,15]
        })

        let no = 1;
        for(let i=0; i<data.length; i++){
            table.push([`${no}`, `${data[i].username}`, `${data[i].password}`, `${data[i].position}`,`${data[i].statusLogin}`])
            no++;
        }
        
        console.log(table.toString())
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