const database = require('../../config/database/connect')
const shopModel = require('../model/ShopModel')

class SupperAdminController{

    shopManagement(req, res)
    {
        shopModel.getShopList()
            .then((result) => {
                res.render('admin/dashboard', {shopList: result, page: 'shopManagement', type: 'list',role:req.userRole})
            })
    }

    addShop(req, res)
    {
        res.render('admin/dashboard', {page: 'shopManagement', type: 'add', role:req.userRole})
    }

    addShopProcess(req, res)
    {
       let shopName = req.body.shopName
       let shopAddress = req.body.shopAddress
       shopModel.add(shopName, shopAddress).then((result) => {
           if(result !== 0) {
               res.send({status:200, mess:'add success'})
           } else {
               res.send({status:400, mess:'add fail'})
           }
       })
    }

    editShop(req, res){
        let shopId = req.params.id
        shopModel.getEdit(shopId).then((result) =>{
            if(result.length !== 0){
                res.render('admin/dashboard',{shop:result, page: 'shopManagement', type: 'edit', role:req.userRole})
            } else {
                res.render('admin/404page.ejs')
            }
        })
    }

    editShopProcess(req, res){
        let shopId = req.body.shopId
        let shopName = req.body.shopName
        let shopAddress = req.body.shopAddress
        shopModel.edit(shopId, shopName, shopAddress).then((result) => {
            if(result !== 0){
                res.send({status:200, mess: 'update shop success'})
            } else {
                res.send({status:400, mess: 'update shop fail'})
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
                        res.render('admin/dashboard', {staff: staff.rows, shopList:shop.rows, page:'staffManagement', type: 'edit', role: req.userRole})
                })
            })
    }

    editStaffProcess(req, res)
    {
        let fullname = req.body.fullName
        let phone = req.body.phone
        let ownerShop = req.body.ownerShop
        let userId = req.body.userId

        database.query(`update users set shop_id = '${ownerShop}', fullname = '${fullname}', phone = '${phone}'  where user_id = ${userId}`)
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

    getRevenueAllShop(req, res){
        var fromDate = null
        var toDate = null

        if(req.body.date){
            fromDate  = req.body.fromDate
            toDate = req.body.toDate
        } else {
            var getDate = new Date();
            fromDate = getDate.toJSON().substring(0, 10)
            toDate = getDate.toJSON().substring(0, 10)
        }
        const handleGetRevenue = async () => {
            let revenue = await   shopModel.getRevenueAllShopByDate(fromDate, toDate)
            let shops = await   shopModel.getShopList()
            res.send({status:200, revenue, shops})
        }
        handleGetRevenue()

    }

}

module.exports = new SupperAdminController