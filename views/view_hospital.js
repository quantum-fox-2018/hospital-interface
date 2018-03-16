class ViewHospital{
    constructor() {
        
    }

    static showData(dataHospital){
        console.log(`This is Hospital information:\n Name: ${dataHospital.name}\n Address: ${dataHospital.location}\n Employees: ${dataHospital.employees}\n Patients: ${dataHospital.patients}`)
    }
}

module.exports = ViewHospital