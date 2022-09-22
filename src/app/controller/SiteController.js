class SiteController{
    home(req, res, next)
    {
        res.render('home/home')
    }

    admin(req, res, next)
    {

    }
}

module.exports = new SiteController