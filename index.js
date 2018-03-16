let argv = process.argv;

const Controller = require('./controllers/controller.js')

if(argv[2] == null){
    console.log('help')
} else {
    let argvArray = argv.slice(3)
    Controller.manageCommand(argv[2], argvArray);
}