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
        if(req.role === '1')
        {
            res.render('admin/dashboard.ejs', {role:1})
        }
        else
        {
            res.render('admin/dashboard.ejs', {role:0})
        }
    }

    page404(req, res, next)
    {
        res.status(404)
        res.render('admin/404page')
    }

    supperAdminPage(req, res)
    {
        res.send('supper admin')
    }

}

module.exports = new SiteController