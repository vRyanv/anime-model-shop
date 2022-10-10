const database = require('../../config/database/connect')
class CategoryController{

    getCategoryList(req, res)
    {
        database.query(`select * from category`)
            .then((result) => {
                res.render('admin/dashboard.ejs', {cateList: result.rows, page:'category', type:'list', role: req.userRole})
            })
    }

    getAdd(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'category', type:'add', role: req.userRole})
    }

    getEdit(req, res, next)
    {
        database.query(`select * from category where cate_id = ${req.params.id}`)
            .then((result) => {
                res.render('admin/dashboard.ejs', {category: result.rows,page: 'category', type:'edit', proId:req.params.id, role: req.userRole})
            })

    }

    add(req, res)
    {
        database.query(`insert into category (cate_name) values ('${req.body.cateName}')`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess: 'add category success'})
                }
                else
                {
                    res.send({status:400, mess: 'add category fail'})
                }
            })
    }

    edit(req, res)
    {
        database.query(`update category set cate_name = '${req.body.cateName}' where cate_id = ${req.body.cateId}`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess: 'update category success'})
                }
                else
                {
                    res.send({status:400, mess: 'update category fail'})
                }
            })
    }

    delete(req, res)
    {
        database.query(`select cate_id from product where cate_id = ${req.body.cateId}`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:400, mess: 'Cant not delete this category because it was used'})
                }
                else
                {
                    database.query(`delete from category where cate_id = ${req.body.cateId}`)
                        .then((result) => {
                            if(result.rowCount !== 0)
                            {
                                res.send({status:200, mess: 'delete category success'})
                            }
                            else
                            {
                                res.send({status:400, mess: 'delete category fail'})
                            }
                        })
                }
            })
    }

}

module.exports = new CategoryController()