const database = require('../src/config/database/connect')
const {query} = require("express");
// database.query("INSERT INTO users(username, password, role)VALUES ('canthoshop', '123123123', '1')")
//     .then((result) => console.log(result))
// database.query("select * from users")
//     .then(result => console.log(result.rows))
// database.query("select shop_id from users where user_id = 12")
//     .then((result) => console.log(result.rows[0].shop_id))
// database.query('select * from orderdetail')
//     .then((result) =>
//     {
//         console.log(result.rows)
//         database.end()
//     })
// database.query(`select quantity, (select pro_price from product where pro_id = 12) as pro_price
//                 from orderdetail where orderdetail_id = 9`)
//     .then((result) => {
//         console.log(result.rows)
//         let price = result.rows[0].pro_price
//         price = parseFloat(price.substring(1))
//         console.log(price)
//     })
// database.query(`select * from orders`)
//     .then((result) => {
//         console.log(result.rows)
//     })
database.query(`insert into orders(user_id, status) values (14, '0') returning *`)
    .then((result) => {
        console.log(result.rows)
    })

// database.query(`select sum(price) as p from orderdetail where order_id = 1`).then((result) => {
    // let priceList = result.rows
    // let totalPrice = 0
    // console.log(priceList)
    // for (let i = 0; i < priceList.length;i++){
    //     totalPrice += parseFloat(priceList[i].price.substring(1))
    // }
    // console.log(result.rows);
// })


database.end()






