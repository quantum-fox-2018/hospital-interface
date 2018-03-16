var Table = require('cli-table')

class View{
    static showConfirmation(str){
        console.log(str);
    }

    static showTable(data){
        let keyHeader = Object.keys(data);
        var table = new Table({
            header: keyHeader,
        })

        for(let indexData = 0; indexData<data.length; indexData++){
            table.push(data[indexData].name, data[indexData].position, data[indexData].username, data[indexData].password, data[indexData].isLogin);
        }
        
        console.log(table);
    }
}

module.exports = View;