
const Controller = require('./Controller');

var newData = process.argv
//console.log(newData.slice(2));

let controller = new Controller(newData[2],newData.slice(3));

controller.execute()
