const fs = require('fs')

class AddEmployee{
  static addData(input){
// console.log("sampe",employee);
    fs.readFile('./employee.json','utf8',(err,data)=>{
      let employeeData = JSON.parse(data)
      let employee = {name:input.name,position:input.position,username:input.username,password:input.password}
      employeeData.push(employee)
      let max = employeeData.length
      let newFormat = JSON.stringify(employeeData,null,2)
      fs.writeFile('./employee.json',newFormat,(err)=>{
        if (err) throw err
        //callback(employee)
        console.log(`sava data success employee ${input.name},${employeeData.length} `);
      })
    })

  }

  static login(arrDataLogin){
    console.log(arrDataLogin[0],arrDataLogin[1]);
    fs.readFile('./employee.json', 'utf8',(err, data) => {
    let employeeData = JSON.parse(data)
    if (err) throw err;
    let username = null;
    for (var i = 0; i < employeeData.length; i++) {
      if(employeeData[i].username == arrDataLogin[0] && employeeData[i].password == arrDataLogin[1]){
         username=true
         console.log(`name: ${employeeData[i].name}, password: ${arrDataLogin[1]},role ${employeeData[i].position} berhasil login`);
      }else {
        username= false
      }
    }
    if(username==false){
      console.log('username /password salah');
    }
    
    });
  }
}



module.exports = AddEmployee
