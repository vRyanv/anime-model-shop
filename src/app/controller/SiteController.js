const productModel = require('../model/ProductModel')
const cartModel = require('../model/CartModel')
const cateModel = require('../model/CategoryModel')
const shopModel = require('../model/ShopModel')

class SiteController{

    login(req, res)
    {
        res.render('admin/login/login')
    }

    register(req, res)
    {
        res.render('admin/login/register')
    }

    logout(req, res)
    {
        res.cookie('__token_user', '')
        res.redirect('/login')
    }

    dashboard(req, res)
    {
        var getDate = new Date();
        let date = getDate.toJSON().substring(0, 10).replaceAll('-', '/')
        res.render('admin/dashboard.ejs', {page:'dashboard', date, role: req.userRole})
    }

    page404(req, res)
    {
        res.status(404)
        res.render('admin/404page')
    }

    home(req, res)
    {
        res.render('client/index.ejs', {page:'home', login:req.login})
    }

    about(req, res)
    {
        res.render('client/about.ejs', {page:'about', login:req.login})
    }

    shop(req, res)
    {

        if(req.login){
            const handleRequest = async() => {
                const proList = await productModel.getProForCustomer()
                const cateList = await cateModel.getCateList()
                const quantityProInCart = await cartModel.getQuantityProInCart(req.cartId)
                res.render('client/shop.ejs', {proList, cateList,quantity: quantityProInCart.rowCount, page:'shop', login:req.login, fullName:req.fullName})
            }
            handleRequest()
        } else {
            const handleRequest = async() => {
                const proList = await productModel.getProForCustomer()
                const cateList = await cateModel.getCateList()
                res.render('client/shop.ejs', {proList, cateList, page:'shop', login:req.login})
            }
            handleRequest()
        }

    }

    contact(req, res)
    {
        res.render('client/contact.ejs', {page:'contact', login:req.login})
    }


    cart(req, res)
    {
        res.render('client/cart.ejs', {page:'cart', login:req.login})
    }

    getOrderTab(req, res){
        shopModel.getAllOrder(req.userId).then((result) => {
            res.render('admin/dashboard.ejs', {page: 'order', orderList: result,role: req.userRole})
        })
    }

    getOrderDetail(req, res){
        shopModel.getOrderDetailShop(req.userId, req.params.id).then((result) => {
            let orderDetail = result
            let totalPrice = 0
            for (let i=0;i<orderDetail.length;i++){
                totalPrice += parseFloat(orderDetail[i].price.substring(1))
            }
            if(orderDetail){
                res.send({status:200, orderDetail, totalPrice})
            } else {
                res.send({status:400, mess: 'Not found'})
            }

        })
    }

    totalRevenueOfShop(req, res){
        var fromDate = null
        var toDate = null
        if(req.body.date){
            console.log('here')
            fromDate  = req.body.fromDate
            toDate = req.body.toDate
        } else {
            var getDate = new Date();
            fromDate = getDate.toJSON().substring(0, 10)
            toDate = getDate.toJSON().substring(0, 10)
        }
        shopModel.getRevenueOfShop(req.userId, fromDate, toDate).then((revenue) => {
            shopModel.getShopName(req.userId).then((shop) => {
                res.send({status:200, revenue, shopName:shop.shop_name})
            })
        })
    }

}

module.exports = new SiteController