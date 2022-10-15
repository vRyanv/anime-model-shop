const database = require('../src/config/database/connect')
// database.query("INSERT INTO users(username, password, role)VALUES ('canthoshop', '123123123', '1')")
//     .then((result) => console.log(result))
// database.query("select * from users")
//     .then(result => console.log(result.rows))
// database.query("select shop_id from users where user_id = 12")
//     .then((result) => console.log(result.rows[0].shop_id))
database.query('select * from users')
    .then((result) =>
    {
        console.log(result.rows)
        database.end()
    })
// database.query(`delete from users where user_id = 11`)
//     .then((result) => {
//         console.log(result.rows)
//     })

