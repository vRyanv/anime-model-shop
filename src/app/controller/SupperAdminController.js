const database = require('../../config/database/connect')
class SupperAdminController{

    statistical(req, res)
    {
        res.render('admin/dashboard', {page:'dashboard', role: req.userRole})
    }

    shopManagement(req, res)
    {
        database.query(`select * from shop`)
            .then((result) => {
                res.render('admin/dashboard', {shopList: result.rows, page: 'shopManagement', type: 'list',role:req.userRole})
            })
    }

    addShop(req, res)
    {
        res.render('admin/dashboard', {page: 'shopManagement', type: 'add', role:req.userRole})
    }

    addShopProcess(req, res)
    {
        console.log(req.body)
       let shopName = req.body.shopName
       let shopAddress = req.body.shopAddress
        database.query(`insert into shop(shop_name, shop_address) values('${shopName}', '${shopAddress}')`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    console.log(result)
                    res.send({status:200, mess:'add success'})
                }
                else
                {
                    res.send({status:400, mess:'add fail'})
                }
            })
    }

    staffManagement(req, res)
    {
        database.query(`select user_id, fullname , phone, shop.shop_name from users, shop where shop.shop_id = users.shop_id`)
            .then((result) => {
                res.render('admin/dashboard', {staffList: result.rows,page: 'staffManagement', type: 'list', role:req.userRole})
            })
    }

    addStaff(req, res)
    {
        database.query('select * from shop')
            .then((result) => {
                res.render('admin/dashboard', { shopList: result.rows, page: 'staffManagement', type: 'add', role:req.userRole})
            })

    }

    addStaffProcess(req, res)
    {
        let username = req.body.username
        let pass = req.body.pass
        let fullname = req.body.fullName
        let phone = req.body.phone
        let ownerShop = req.body.ownerShop

        database.query(`insert into users (username, password, fullname, phone, shop_id, role) values ('${username}', ${pass}, '${fullname}', '${phone}', ${ownerShop}, '1')`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess:'add staff success'})
                }
                else
                {
                    res.send({status:400, mess:'add staff fail'})
                }
            })
    }

    editStaff(req, res)
    {
        database.query(`select * from users where user_id = '${req.params.userId}'`)
            .then((staff) => {

                database.query(`select * from shop`)
                    .then((shop) => {
                        console.log(staff.rows)
                        res.render('admin/dashboard', {staff: staff.rows, shopList:shop.rows, page:'staffManagement', type: 'edit', role: req.userRole})
                })
            })
    }

    editStaffProcess(req, res)
    {
        let ownerShop = req.body.ownerShop
        let userId = req.body.userId

        database.query(`update users set shop_id = '${ownerShop}' where user_id = ${userId}`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess:'update staff success'})
                }
                else
                {
                    res.send({status:400, mess:'update staff fail'})
                }
            })
    }


}

module.exports = new SupperAdminController