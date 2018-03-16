class Patient {
  constructor(objPatient) {
    this.id = objPatient.id;
    this.name = objPatient.name;
    this.diagnosis = objPatient.diagnosis;
  }
}

module.exports = {
  Patient
};
