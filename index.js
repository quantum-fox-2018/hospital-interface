let argv = process.argv;

const Controller = require('./controllers/controller.js')

if(argv[2] == null){
    console.log('help')
} else {
    Controller.manageCommand(argv[2], argv[3], argv[4], argv[5])
}