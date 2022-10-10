const database = require('../../config/database/connect')

class ProductModel
{

    add(userId, product)
    {
        return database.query(`select shop_id from users where user_id = ${userId}`)
            .then((shop) => {
                console.log(shop.rows[0].shop_id)
                console.log(product)
                // if(shop.rowCount !== 0) {
                //     console.log(shop)
                //     database.query(`insert into product(cate_id, shop_id, sup_id, pro_name, pro_image, pro_price, inventory)
                //         values (${product.cateId}, ${shop.rows[0].shop_id}, ${product.supId}, '${product.proName}', '${product.proImage}', '${product.proPrice}', ${product.inventory})`)
                //         .then((result) => {
                //             return result.rowCount !== 0
                //         })
                // }
                // else
                // {
                //     return false
                // }
            })
    }

    update(userId, product)
    {

    }

    delete()
    {

    }
}

module.exports = new ProductModel