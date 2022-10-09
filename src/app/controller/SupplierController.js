const database = require('../../config/database/connect')
class SupplierController{

    getSupplierList(req, res)
    {
        database.query(`select * from supplier`)
            .then((result) => {
                res.render('admin/dashboard.ejs', {supList: result.rows, page:'supplier', type:'list', role: req.role})
            })

    }

    getAdd(req, res)
    {
        res.render('admin/dashboard.ejs', {page: 'supplier', type:'add', role: req.role})

    }

    getEdit(req, res)
    {
        database.query(`select * from supplier where sup_id = ${req.params.id}`)
            .then((result) => {
                res.render('admin/dashboard.ejs', { supplier: result.rows, page: 'supplier', type:'edit', role: req.role})
            })
    }

    add(req, res)
    {
        database.query(`insert into supplier(sup_name, sup_address) values ('${req.body.supName}', '${req.body.supAddress}')`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess:'add supplier success'})
                }
                else
                {
                    res.send({status:400, mess:'add supplier fail'})
                }
            })
    }

    edit(req, res)
    {
        database.query(`update supplier set sup_name = '${req.body.supName}', sup_address = '${req.body.supAddress}' where sup_id = ${req.body.supId}`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:200, mess:'update supplier success'})
                }
                else
                {
                    res.send({status:400, mess:'update supplier fail'})
                }
            })
    }

    delete(req, res)
    {
        database.query(`select sup_id from product where sup_id = ${req.body.supId}`)
            .then((result) => {
                if(result.rowCount !== 0)
                {
                    res.send({status:400, mess:'Cant not delete this supplier because it was used'})
                }
                else
                {
                    database.query(`delete from supplier where sup_id = ${req.body.supId}`)
                        .then((result) => {
                            if(result.rowCount !== 0)
                            {
                                res.send({status:200, mess:'delete supplier success'})
                            }
                            else
                            {
                                res.send({status:400, mess:'delete supplier fail'})
                            }
                        })
                }
            })

    }

}

module.exports = new SupplierController