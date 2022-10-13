const database = require("../../config/database/connect");

class CartModel{
    getCart(userId){
        return database.query(`select order_id from orders where user_id = ${userId} and status = '0'`)
    }

    createCart(userId){
        return database.query(`insert into orders(user_id, status) values ('${userId}', '0') returning *`)
    }

    addToCart(orderId,proId, price){
        return database.query(`insert into orderdetail(order_id, pro_id, quantity, price)
                                values (${orderId}, ${proId}, 1, ${price})`)
    }

    isExistPro(orderId, proId){
        return database.query(`select pro_id from orderdetail where order_id = ${orderId} and pro_id = ${proId}`)
    }

    getProDuctInCart(orderId){
        return database.query(`select * from orderdetail where order_id = ${orderId}`)
    }

}

module.exports = new CartModel