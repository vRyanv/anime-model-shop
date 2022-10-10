const productModel = require('../model/ProductModel')
const categoryModel = require('../model/CategoryModel')
const supplierModel = require('../model/SupplierModel')
const {unlink} = require('node:fs')

class ProductController{

    getProductList(req, res)
    {
        productModel.getProList(req.userId)
            .then((proList) => {
                res.render('admin/dashboard.ejs', {
                    proList,
                    page:'product',
                    type:'list',
                    role: req.userRole
                })
            })
    }

    getAdd(req, res)
    {
        const handleRequest = async() => {
            const cateList = await categoryModel.getCateList()
            const supList = await supplierModel.getSupList()
            res.render('admin/dashboard.ejs', {
                cateList,
                supList,
                page: 'product',
                type:'add',
                role: req.userRole
            })
        }
        handleRequest()
    }

    getEdit(req, res)
    {
        const handleRequest = async() => {
            const cateList = await categoryModel.getCateList()
            const supList = await supplierModel.getSupList()
            const pro = await productModel.findPro(req.params.id)
            res.render('admin/dashboard.ejs', {
                pro,
                cateList,
                supList,
                page: 'product',
                type:'edit',
                role: req.userRole
            })
        }
        handleRequest()
    }

    add(req, res)
    {
        if(!req.errorUpload) {
            let product = {
                cateId: req.body.proCate,
                supId: req.body.proSup,
                proName: req.body.proName,
                proImage: req.file.filename,
                proPrice: req.body.proPrice,
                inventory: req.body.inventory,
            }
                productModel.add(req.userId, product)
                    .then((result) => {
                        if(result){
                            res.send({status:200, mess:'add product success'})
                        }else {
                            res.send({status:400, mess:'add product fail'})
                        }
                    })
        } else {
            res.send({status:400, mess:'invalid image'})
        }
    }

    edit(req, res)
    {
        let product = {
            cateId: req.body.proCate,
            supId: req.body.proSup,
            proName: req.body.proName,
            proPrice: req.body.proPrice,
            inventory: req.body.inventory,
        }
        if(req.file) {
            productModel.edit(req.body.proId, product, req.file.filename)
                .then((result) => {
                    if(result.rowCount !== 0){
                        console.log(result)
                        // unlink('src/public/images/product/'+req., (err) => {
                        //     if (!err){
                        //         res.send({status:200, mess: 'update product success'})
                        //     } else {
                        //         res.send({status:400, mess: 'update product fail'})
                        //     }
                        // });
                    }
                })
        }else {
            productModel.edit(req.body.proId, product, '')
                .then((result) => {
                    if (result.rowCount !== 0){
                        res.send({status:200, mess: 'update product success'})
                    } else {
                        res.send({status:400, mess: 'update product fail'})
                    }
                })
        }

    }

    delete()
    {

    }

}

module.exports = new ProductController()