const database = require('../../config/database/connect')
class ProductController{

    getProductList(req, res)
    {
        res.render('admin/dashboard.ejs', {page:'product', type:'list', role: req.role})
    }

    getAdd(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'product', type:'add', role: req.role})
    }

    getEdit(req, res, next)
    {
        res.send('dashboard user ID: ' + req.id)
    }

    add()
    {

    }

    edit()
    {

    }

    delete()
    {

    }

}

module.exports = new ProductController()