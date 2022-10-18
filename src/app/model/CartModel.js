const database = require("../../config/database/connect");
const {query} = require("express");

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

    getProDuctInCart(orderId) {
        return database.query(`select p.pro_id,
                                      p.pro_image,
                                      p.pro_name,
                                      p.pro_price,
                                      od.quantity,
                                      od.price,
                                      od.orderdetail_id
                               from orderdetail as od, product as p, orders as o
                               where od.order_id = ${orderId} 
                               and p.pro_id = od.pro_id
                               and od.order_id = o.order_id
                               and o.status = '0'`)
    }

    getQuantityProInCart(orderId){
        return database.query(`select od.orderdetail_id from orderdetail as od, orders as o
                                where od.order_id = ${orderId} and o.status = '0'
                                and od.order_id = o.order_id`)

    }

    updateProInforInCart(orderDetailId, quantity, totalPrice){
        return database.query(`update orderdetail set quantity = ${quantity}, price = ${totalPrice}
                                where orderdetail_id = ${orderDetailId} returning *`)
            .then((result) => {
                console.log(result)
                return result.rows
            })
    }

    getInfoProInCart(orderDetailId, proId){
        return database.query(`select quantity, (select pro_price from product where pro_id = ${proId}) as pro_price 
                            from orderdetail where orderdetail_id = ${orderDetailId}`)
            .then((result) => {
                return result.rows
            })
    }

    deleteProductInCart(orderDetailId){
        return database.query(`delete from orderdetail where orderdetail_id = ${orderDetailId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    getOrderInfo(orderId){
        return database.query(`select * from orders where order_id = ${orderId}`)
            .then((result) => {
                return result.rows
            })
    }

    getProTotalPrice(orderId){
       return database.query(`select sum(price) as price from orderdetail where order_id = ${orderId}`)
            .then((result) => {
                return result.rows
            })
    }

    placeOrder(orderInfo) {
        return database.query(`update orders
                               set order_date    = '${orderInfo.orderDate}',
                                   delivery_date = '${orderInfo.deliveryDate}',
                                   status = '1'
                               where order_id = ${orderInfo.orderId}`)
            .then((result) => {
                return result.rowCount
            })
    }
}

module.exports = new CartModel