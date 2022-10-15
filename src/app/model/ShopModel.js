const database = require('../../config/database/connect')

class ShopModel{
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

    delete(){

    }

}

module.exports = new ShopModel