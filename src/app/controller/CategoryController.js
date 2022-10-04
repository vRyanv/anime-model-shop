const database = require('../../config/database/connect')
class CategoryController{

    getCategoryList(req, res)
    {
        res.render('admin/dashboard.ejs', {page:'category', type:'list', role: req.role})
    }

    getAdd(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'category', type:'add', role: req.role})
    }

    getEdit(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'category', type:'edit', proId:req.params.id, role: req.role})
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

module.exports = new CategoryController()