const database = require('../../config/database/connect')


class ProductModel
{
    getProForCustomerFollowCate(cateId) {
        console.log(cateId)
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      sp.sup_name,
                                      s.shop_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as sp,
                                    shop as s
                               where c.cate_id = p.cate_id
                                 and p.shop_id = s.shop_id
                                 and p.sup_id = sp.sup_id
                                 and c.cate_id = ${cateId}`)
            .then((result) => {
                return result.rows
            })
    }

    getClientSearchPro(proName){
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      sp.sup_name,
                                      s.shop_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as sp,
                                    shop as s
                               where c.cate_id = p.cate_id
                                 and p.sup_id = sp.sup_id
                                 and p.shop_id = s.shop_id
                                 and p.pro_name like '%${proName}%'`)
            .then((result) => {
                return result.rows
            })
    }

    getProPrice(proId){
        return database.query(`select pro_price from product where pro_id = ${proId}`)
            .then((result) => {
                return result.rows[0].pro_price
            })
    }

    searchPro(userId, proName) {
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as s
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = (select shop_id from users where user_id = ${userId})
                                 and p.pro_name like '%${proName}%'`)
            .then((result) => {
                return result.rows
            })
    }
    getProList(userId) {
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as s
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = (select shop_id from users where user_id = ${userId})`)
            .then((result) => {
                return result.rows
            })
    }

    getProForCustomer() {
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      sp.sup_name,
                                      s.shop_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as sp,
                                    shop as s
                               where c.cate_id = p.cate_id
                                 and p.shop_id = s.shop_id
                                 and p.sup_id = sp.sup_id`)
            .then((result) => {
                return result.rows
            })
    }

    findPro(proId) {
        return database.query(`select p.pro_id,
                                      p.cate_id,
                                      c.cate_name,
                                      s.sup_id,
                                      s.sup_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.inventory
                               from product as p,
                                    category as c,
                                    supplier as s
                               where p.cate_id = c.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.pro_id = ${proId}`)
            .then((result) => {
                return result.rows
            })
    }

    add(userId, product) {
        console.log('user id'+userId)
        const processAdd = async () => {
            const shopId = await database.query(`select shop_id
                                                 from users
                                                 where user_id = ${userId}`)
            console.log(shopId)
            const result = await database.query(`insert into product(cate_id, shop_id, sup_id, pro_name, pro_image, pro_price, inventory)
                                                 values (${product.cateId}, ${shopId.rows[0].shop_id}, ${product.supId},
                                                         '${product.proName}', '${product.proImage}',
                                                         '${product.proPrice}', ${product.inventory})`)
            return result.rowCount !== 0
        }
        return processAdd()
    }

    edit(product, image) {
        if (image) {
            return database.query(`update product
                                   set cate_id   = ${product.cateId},
                                       sup_id    = ${product.supId},
                                       pro_name  = '${product.proName}',
                                       pro_image = '${image}',
                                       pro_price = ${product.proPrice},
                                       inventory = ${product.inventory}
                                   where pro_id = ${product.proId}`)
        } else {
            return database.query(`update product
                                   set cate_id   = ${product.cateId},
                                       sup_id    = ${product.supId},
                                       pro_name  = '${product.proName}',
                                       pro_price = ${product.proPrice},
                                       inventory = ${product.inventory}
                                   where pro_id = ${product.proId}`)
        }

    }

    delete(proId) {
        const processDelete = async () => {
            const productUsed = await database.query(`select pro_id
                                                      from orderdetail
                                                      where pro_id = ${proId}`)
            if (productUsed.rowCount === 0) {
                const result = await database.query(`delete
                                                     from product
                                                     where pro_id = ${proId}`)
                return result !== 0
            } else {
                return false
            }
        }
        return processDelete()
    }


}

module.exports = new ProductModel