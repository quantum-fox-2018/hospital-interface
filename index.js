const File = require('./controller');

let argv = process.argv

// console.log(argv)
let command = argv[2]

if(command === 'register' || command === undefined ){
  const dataUser = {
    name: argv[3],
    username: argv[4],
    password: argv[5],
    position: argv[6]
  }
  File.tambahData(dataUser)

}
else if(command==='login'){
  const datalogin = {
    username: argv[3],
    password: argv[4]
  }
  File.cekLogin(datalogin)

}
else if(command==='myPassword'){
  console.log('ini fitur my password')
}
else if(command==='myPosition'){
  console.log('ini fitur my position')
}
else {
  console.log(`tidak ada perintah '${command}'`)
}
