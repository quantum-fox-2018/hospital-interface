class ViewPatient{
    constructor() {
        
    }

    static addSuccess(dataPatient){
        console.log(`save data patient: "${dataPatient.name}" has sucess`)
    }
}

module.exports = ViewPatient