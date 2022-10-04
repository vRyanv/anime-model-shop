const database = require('../src/config/database/connect')

database.query("INSERT INTO admin(username, password, role)VALUES ('hanoishop', '123', '1')")
// database.query("select * from admin")
//     .then(result => console.log(result.rows))
