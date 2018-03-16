const Controller = require('./controllers/Controller')

let argv = process.argv
Controller.routes(argv)

/*
node index.js login budi 123456
> user logged in successfully

node index.js addPatient 1 Daniel batuk flu pilek demam
>data pasien berhasil ditambahkan. Total data pasien : 1
  >tidak memiliki akses untuk add patient

release4: buat agar id patient auto increment

release5: buat fitur logout
*/