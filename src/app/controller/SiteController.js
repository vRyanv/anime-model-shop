class SiteController{
    home(req, res, next)
    {
        res.render('client/index/index')
    }

    about(req, res, next)
    {
        res.render('client/index/about')
    }

    contact(req, res, next)
    {
        res.render('client/index/contact')
    }

    shop(req, res, next)
    {
        res.render('client/index/shop')
    }

    admin(req, res, next)
    {
        res.render('admin/dashboard')
    }

    login(req, res, next)
    {
        res.render('client/login/login')
    }

    cart(req, res, next)
    {
        res.render('client/cart/cart')
    }
}

module.exports = new SiteController