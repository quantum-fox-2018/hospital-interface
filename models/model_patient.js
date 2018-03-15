const fs =  require('fs')

class ModelPatient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static addPatient(name, diagnosis, callback){
      fs.readFile('./patient.json', (err, dataPatient) => {
        if(err){
          console.log(err)
        }
        let patient_data = JSON.parse(dataPatient)
        // console.log(patient_data)
        fs.readFile('./data_login.json', (err, dataLogin) => {
          if(err){
            console.log(err)
          }
          let login_data = JSON.parse(dataLogin)
          // console.log(login_data)
          if(login_data.length == 0){
            console.log('silakan login dulu dong!!')
          }
          for(let i=0; i<login_data.length; i++){
            if(login_data[i].position == 'dokter'){
              let idPatient = patient_data.length+1
              let objPatient = new ModelPatient(idPatient, name, diagnosis)
              patient_data.push(objPatient)
              // console.log(patient_data)

              fs.writeFile('./patient.json', JSON.stringify(patient_data, null, 2), (err) =>{
                if(err){
                  console.log(err)
                }
                callback(objPatient)

              })
            } else {
              console.log(`Anda bukan dokter...Jadi dokter dulu dooooong!! \nPanggil dokternya untuk login.`)
            }

          }
        })
      })
    }

}

// ModelPatient.addPatient('kang tatang', 'sakit perut')

module.exports = ModelPatient