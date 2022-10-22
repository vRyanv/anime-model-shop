const database = require('../../config/database/connect')

class ShopModel{
    getShopList(){
        return database.query(`select * from shop`)
            .then((result) => {
                return result.rows
            })
    }

    add(shopName, address){
        return database.query(`insert into shop(shop_name, shop_address) values('${shopName}', '${address}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getEdit(shopId){
        return database.query(`select * from shop where  shop_id = ${shopId}`)
            .then((result) => {
                return result.rows
            })
    }

    edit(shopId, shopName, address){
        return database.query(`update shop set 
                                shop_name = '${shopName}', shop_address = '${address}'
                                where shop_id = ${shopId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    getRevenueAllShopByDate(fromDate, toDate) {
        return database.query(`select s.shop_id, s.shop_name, p.pro_id, od.price, o.status
                               from product as p,
                                    shop as s,
                                    orderdetail as od,
                                    orders as o
                               where p.shop_id = s.shop_id
                                 and od.pro_id = p.pro_id
                                 and o.order_id = od.order_id
                                 and o.status = '1'
                                 and o.order_date >= '${fromDate}' and o.order_date <= '${toDate}'
        `)
            .then((result) => {
                return result.rows
            })
    }

    getRevenueOfShop(userId, fromDate, toDate) {
        return database.query(`select s.shop_id, s.shop_name, p.pro_id, sum(od.price), o.status, o.order_date
                               from product as p,
                                    shop as s,
                                    orderdetail as od,
                                    orders as o
                               where p.shop_id = s.shop_id
                                 and od.pro_id = p.pro_id
                                 and o.order_id = od.order_id
                                 and o.status = '1'
                                 and s.shop_id = (select shop_id from users where user_id =${userId})
                                 and o.order_date >= '${fromDate}'
                                 and o.order_date <= '${toDate}'
                               group by s.shop_id, s.shop_name, p.pro_id, o.status, o.order_date`)
            .then((result) => {
                return result.rows
            })
    }

    getAllOrder(userId) {
        return database.query(`select o.order_id, 
                                        u.username, 
                                        u.fullname, 
                                        u.phone, 
                                        u.address,
                                        to_char(o.order_date, 'DD/MM/YYYY') as order_date,
                                        to_char(o.delivery_date, 'DD/MM/YYYY') as delivery_date
                               from orders as o, users as u, shop as s, orderdetail as od, product as p
                               where o.user_id = u.user_id
                                 and o.order_id = od.order_id
                                 and od.pro_id = p.pro_id
                                 and p.shop_id = s.shop_id
                                 and o.status = '1'
                                 and s.shop_id = (select shop_id from users where user_id = ${userId})
                                 group by o.order_id, u.username, u.fullname, u.phone,  u.address, o.order_date, o.delivery_date`)
            .then((result) => {
                return result.rows
            })
    }

    getShopName(userId) {
        return database.query(`select s.shop_name
                               from shop as s,
                                    users as u
                               where u.shop_id = s.shop_id
                               and u.user_id = ${userId}`)
            .then((result) => {
                return result.rows[0]
            })
    }

    getOrderDetailShop(userId, orderId) {
        return database.query(`select p.pro_image, p.pro_name, p.pro_price, od.quantity, od.price
                               from orderdetail as od,
                                    product as p,
                                    orders as o,
                                    shop as s
                               where od.order_id = ${orderId}
                                 and p.pro_id = od.pro_id
                                 and od.order_id = o.order_id
                                 and p.shop_id = s.shop_id
                                 and s.shop_id = (select shop_id from users where user_id = ${userId})
                               order by od.orderdetail_id desc`)
            .then((result) => {
                return result.rows
            })
    }
}

module.exports = new ShopModel