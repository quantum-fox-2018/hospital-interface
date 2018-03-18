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
}else if(argv[2] === 'logout'){
  Controller.logout(argv[3])
}else{
  console.log('Command is not valid');
}

/*
Drive code
-----Untuk List Pegawai-----
node index.js listPegawai

-----Untuk List Pasien-----
node index.js listPatient

-----Untuk register Pegawai-----
node index.js register username,password,position

-----Untuk login Pegawai-----
node index.js register username,password

-----Untuk menambah Pasien-----
node index.js register nama,diagnosis1,diagnosis2,...

-----Untuk logout-----
node index.js logout username
*/
