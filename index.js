const Controller = require('./controllers')

const argv = process.argv

let syntax = argv[2]
let value = argv.slice(3)

// console.log(syntax, value[0], value[1], value[2])

Controller.syntax(syntax, value[0], value[1], value[2])
