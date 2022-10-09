const database = require('../src/config/database/connect')

// database.query("INSERT INTO users(username, password, role)VALUES ('hanoishop', '123', '1')")
// database.query("select * from users")
//     .then(result => console.log(result.rows))
database.query("select * from users")
    .then((result) => console.log(result.rows))
