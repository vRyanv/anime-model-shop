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

    }
}

module.exports = new SiteController