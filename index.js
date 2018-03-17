const {Controller} = require ('./controller.js')

var argv = process.argv
// console.log(argv);


if(argv[2] === 'register'){
  Controller.register(argv[3])
}else if(argv[2] === 'listPegawai'){
  Controller.listEmployees()
}else if(argv[2] === 'listPatient'){
  Controller.listPatient()
}else if(argv[2] === 'addPatient'){
  Controller.addPatient(argv[3])
}else if(argv[2] === 'login'){
  Controller.login(argv[3])
}

// let controller = new HospitalController()
// controller.process()
