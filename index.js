'use strict'

const {HospitalController,PatientController,EmployeeController} = require ('./controller.js')
const argv = process.argv
 if(argv[2]==='register'){
   EmployeeController.registerEmployee(argv[3],argv[4],argv[5],argv[6])
 }
 else if(argv[2]==='login'){
   EmployeeController.loginEmployee(argv[3],argv[4])
 }
 else if(argv[2]==='addPatient'){
   PatientController.addPatient(argv[3],argv.slice(4))
 }
 else if(argv[2]==='logout'){
   EmployeeController.logoutEmployee(argv[3])
 }
