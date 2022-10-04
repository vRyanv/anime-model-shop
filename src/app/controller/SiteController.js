class SiteController{

    login(req, res)
    {
        res.render('admin/login/login')
    }

    logout(req, res)
    {
        res.cookie('__token_user', null)
        res.redirect('/login')
    }

    dashboard(req, res)
    {
        res.render('admin/dashboard.ejs', {page:'dashboard', role: req.role})
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
        res.render('client/shop.ejs', {page:'shop', login:req.login})
    }

    contact(req, res)
    {
        res.render('client/contact.ejs', {page:'contact', login:req.login})
    }

    profile(req, res)
    {
        req.login ? res.render('client/profile.ejs', {page:'profile', login:req.login}) : res.redirect('/login')
    }

    cart(req, res)
    {
        res.render('client/cart.ejs', {page:'cart', login:req.login})
    }
}

module.exports = new SiteController