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
}

module.exports = new ShopModel