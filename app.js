const argv = process.argv

const Controller = require('./controller/controller.js')

let newData = new Controller(argv[2],argv.slice(3))

newData.execute()
