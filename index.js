const controller = require('./0.controllers/index.js');

let argv = process.argv;
let argv_data = argv.slice(2);

controller.routes(argv_data);

