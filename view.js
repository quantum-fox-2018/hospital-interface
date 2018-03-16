const Table = require('cli-table');
var table = new Table({
    head: ['Nama', 'Username', 'Password', 'Position']
  , colWidths: [5, 30, 30, 30, 30]
});

class View {
  static addSuccess(viewData) {
    // table.push(
    //   [viewData.name],
    //   [viewData.username],
    //   [viewData.password],
    //   [viewData.role])
    // console.log(table.toString());
    console.log('Berhasil menambah data employee!');
    console.log(viewData);
  }

  static loginSuccess(viewData) {
    console.log(viewData);
  }
}

module.exports = View
