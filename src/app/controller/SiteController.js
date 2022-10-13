const productModel = require('../model/ProductModel')
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
        res.render('admin/dashboard.ejs', {page:'dashboard', role: req.userRole})
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
        const handleRequest = async() => {
            const proList = await productModel.getProForCustomer()
            res.render('client/shop.ejs', {proList, page:'shop', login:req.login})
        }
        handleRequest()
    }

    contact(req, res)
    {
        res.render('client/contact.ejs', {page:'contact', login:req.login})
    }


    cart(req, res)
    {
        res.render('client/cart.ejs', {page:'cart', login:req.login})
    }


}

module.exports = new SiteController