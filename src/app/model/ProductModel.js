const database = require('../../config/database/connect')


class ProductModel
{
    getProList(userId){
        return database.query(`select p.pro_id, c.cate_name, p.pro_name, p.pro_image, p.pro_price, p.inventory 
                                from product as p, category as c where c.cate_id = p.cate_id and p.shop_id = (select shop_id from users where user_id = ${userId})`)
            .then((result) =>{
                return result.rows
            })
    }

    getProForCustomer()
    {
        return database.query(`select p.pro_id, c.cate_name, s.shop_name, p.pro_name, p.pro_image, p.pro_price, p.inventory 
                                from product as p, category as c, shop as s where c.cate_id = p.cate_id and p.shop_id = s.shop_id`)
            .then((result) =>{
                return result.rows
            })
    }

    findPro(proId)
    {
        return database.query(`select p.pro_id, p.cate_id, c.cate_name, s.sup_id, s.sup_name, p.pro_name, p.pro_image, p.pro_price, p.inventory 
                            from product as p, category as c, supplier as s where p.cate_id = c.cate_id and p.sup_id = s.sup_id and p.pro_id = ${proId}`)
            .then((result) => {
                return result.rows
            })
    }

    add(userId, product)
    {
        const processAdd = async () =>{
            const shopId = await database.query(`select shop_id from users where user_id = ${userId}`)
            const result = await database.query(`insert into product(cate_id, shop_id, sup_id, pro_name, pro_image, pro_price, inventory)
                         values (${product.cateId}, ${shopId.rows[0].shop_id}, ${product.supId}, '${product.proName}', '${product.proImage}', '${product.proPrice}', ${product.inventory})`)
            return result.rowCount !== 0
        }
        return processAdd()
    }

    edit(proId, product, image)
    {
        if(image.length !== 0){
            return database.query(`update product set cate_id = ${product.cateId}, 
                                    sup_id = ${product.supId}, pro_name = '${product.proName}', 
                                    pro_image = '${product.proImage}', pro_price = ${product.proPrice}, 
                                    inventory = ${product.inventory} where pro_id = ${proId}`)
        }else {
            return database.query(`update product set cate_id = ${product.cateId}, 
                                    sup_id = ${product.supId}, pro_name = '${product.proName}', 
                                    pro_price = ${product.proPrice}, inventory = ${product.inventory} where pro_id = ${proId}`)
        }

    }

    delete()
    {

    }
}

module.exports = new ProductModel