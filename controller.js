const Model = require('./model')
const View = require('./view')

class Controller {

    static addData (name, password, position) {

            Model.addData(name, position, password,function(pesan){
            View.displayMessage(pesan)       
        })
    }

    static login (name, password) {

        Model.login (name, password,function(pesan) {
            
            View.displayMessage(pesan)
        })        
    }

    static addPatien (id, name, diagnosis) {

    }
}

module.exports = Controller