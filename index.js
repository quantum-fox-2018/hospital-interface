const Controller = require('./controllers')

const argv = process.argv

let syntax = argv[2]
let value = argv.slice(3)
let value2 = argv.slice(4)

// console.log(syntax, value[0], value2)

Controller.syntax(syntax, value[0], value2)
