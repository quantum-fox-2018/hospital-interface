var Table = require('cli-table');

class View{
  static display(info){
    console.log(info);
  }

  static displayTableEmployee(people){
    let table = new Table({
        head: ['Username', 'Posisi']
      , colWidths: [25, 25]
    });

    for (var i = 0; i < people.length; i++) {
      table.push(
        [people[i].username, people[i].position]
      )
    }
    console.log(table.toString());
  }

  static displayTablePatient(patient){
    let table = new Table({
        head: ['id', 'name', 'diagnosis']
      , colWidths: [5, 25, 35]
    });

    for(let i in patient){
      table.push(
        [patient[i].id, patient[i].name, patient[i].diagnosis.toString()]
      )
    }
    console.log(table.toString())
  }
}

module.exports = View
