class SiteController{

    login(req, res)
    {
        res.render('admin/login/login')
    }

    logout(req, res)
    {
        res.cookie('__token_user', null)
        res.redirect('/')
    }

    dashboard(req, res)
    {
        if(req.role === '2')
        {
            res.render('admin/dashboard.ejs', {page:'dashboard', role:2})
        }
        else
        {
            res.render('admin/dashboard.ejs', {page:'dashboard', role:1})
        }
    }

    page404(req, res)
    {
        res.status(404)
        res.render('admin/404page')
    }

    // supperAdminPage(req, res)
    // {
    //     res.send('supper admin')
    // }

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

    cart(req, res)
    {
        res.render('client/cart.ejs', {page:'cart', login:req.login})
    }
}

module.exports = new SiteController