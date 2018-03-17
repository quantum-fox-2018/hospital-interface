
const Controller = require('./Controller');

var newData = process.argv

let controller = new Controller(newData[2],newData.slice(3));

controller.execute()
