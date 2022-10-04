const database = require('../../config/database/connect')
class SupplierController{

    getSupplierList(req, res)
    {
        res.render('admin/dashboard.ejs', {page:'supplier', type:'list', role: req.role})
    }

    getAdd(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'supplier', type:'add', role: req.role})
    }

    getEdit(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'supplier', type:'edit', proId:req.params.id, role: req.role})
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

module.exports = new SupplierController