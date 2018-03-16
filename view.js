const Table = require('cli-table');
var table = new Table({
    head: ['Nama', 'Username', 'Password', 'Position']
  , colWidths: [5, 30, 30, 30, 30]
});

class View {
  static registerSuccess(viewData) {
    // table.push(
    //   [viewData.name],
    //   [viewData.username],
    //   [viewData.password],
    //   [viewData.role])
    // console.log(table.toString());
    console.log(`Save data Success!`);
    console.log(viewData[viewData.length-1]);
    console.log(`Total employee: ${viewData.length}`);
  }

  static loginSuccess(viewData) {
    console.log(viewData);
  }

  static logoutSuccess(viewData) {
    console.log(viewData);
  }

  static addPatientSucces(viewData) {
    console.log(viewData);
  }

}

module.exports = View
