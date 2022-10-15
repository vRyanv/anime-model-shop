const productModel = require('../model/ProductModel')
const categoryModel = require('../model/CategoryModel')
const supplierModel = require('../model/SupplierModel')
const {unlink} = require('node:fs')

class ProductController{

    clientGetProFollowCate(req, res){
        let cateId = req.params.id
        if(cateId === 'all'){
            productModel.getProForCustomer().then((result) => {
                res.send({status:200, proList: result})
            })
        } else {
            productModel.getProForCustomerFollowCate(cateId).then((result) => {
                res.send({status:200, proList: result})
            })
        }
    }

    clientSearchPro(req, res){
        let proName = req.params.name
        productModel.getClientSearchPro(proName).then((result) => {
            if(result.rowCount !== 0){
                console.log(result)
                res.send({status: 200, proList: result})
            } else {
                res.send({status: 404, mess: 'Not found'})
            }
        })
    }

    searchPro(req, res)
    {
        productModel.searchPro(req.userId, req.params.name)
            .then((pro) => {
                if(pro.length !== 0){
                    res.send({status:200,pro})
                } else {
                    res.send({status:404, mess: 'Not found'})
                }
            })
    }
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
            proId: req.body.proId,
            cateId: req.body.proCate,
            supId: req.body.proSup,
            proName: req.body.proName,
            proPrice: req.body.proPrice,
            inventory: req.body.inventory,
        }

        let processUpdateImage = async () =>{
            const oldImage = await productModel.findPro(product.proId)
            const result =  await productModel.edit(product, req.file.filename)
            if(result.rowCount !== 0){
                unlink('src/public/images/product/'+oldImage[0].pro_image, (err) => {
                    if (!err){
                        res.send({status:200, mess: 'update product success'})
                    } else {
                        res.send({status:400, mess: 'update product fail'})
                    }});
            }
        }

        if(req.hasImg) {
            processUpdateImage()
        }else {
            productModel.edit(product, '')
                .then((result) => {
                    if (result.rowCount !== 0){
                        res.send({status:200, mess: 'update product success'})
                    } else {
                        res.send({status:400, mess: 'update product fail'})
                    }
                })
        }

    }

    delete(req, res)
    {
       const handleRequest = async () =>{
           const deleteImg = await productModel.findPro(req.body.proId)
           const result = await productModel.delete(req.body.proId)
           console.log()
           if(result){
               unlink('src/public/images/product/'+deleteImg[0].pro_image, (err) => {
                   if (!err || err.errno === -4058){
                       res.send({status:200, mess: 'delete product success'})
                   } else {
                       res.send({status:400, mess: 'delete product fail'})
                   }});
           }else {
               res.send({status:400, mess: 'delete product fail'})
           }
       }
       handleRequest()
    }

}

module.exports = new ProductController()