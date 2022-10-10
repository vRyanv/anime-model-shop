const productModel = require('../model/ProductModel')
const categoryModel = require('../model/CategoryModel')
const supplierModel = require('../model/SupplierModel')

class ProductController{

    getProductList(req, res)
    {
        res.render('admin/dashboard.ejs', {page:'product', type:'list', role: req.userRole})
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


        // const handleRequest = new Promise(function (resolve, reject){
        //     let data = {
        //         cateList:null,
        //         supList:null
        //     }
        //     categoryModel.getCateList().then(function (cateList){
        //         data.cateList = cateList
        //     })
        //     supplierModel.getSupList().then(function (supList){
        //         data.supList = supList
        //     })
        //     resolve(data)
        // })
        //
        // handleRequest.then(function (data){
        //     console.log(data)
        //     res.render('admin/dashboard.ejs', {
        //         cateList: data.cateList,
        //         supList: data.supList,
        //         page: 'product',
        //         type:'add',
        //         role: req.userRole
        //     })
        // })

        // categoryModel.getCateList().then(function (cateList){
        //     data.cateList = cateList
        // }).then(() => {
        //     supplierModel.getSupList().then(function (supList){
        //         data.supList = supList
        //     }).then(() => {
        //         res.render('admin/dashboard.ejs', {
        //             cateList: data.cateList,
        //             supList: data.supList,
        //             page: 'product',
        //             type:'add',
        //             role: req.userRole
        //         })
        //     })
        // })

    }

    getEdit(req, res, next)
    {
        res.render('admin/dashboard.ejs', {page: 'product', type:'edit', proId:req.params.id, role: req.userRole})
    }

    add(req, res)
    {
        if(!req.errorUpload)
        {
            let product = {
                cateId :req.body.cateId,
                supId : req.body.supId,
                proName: req.body.proName,
                proImage: req.file.filename,
                proPrice : req.body.proPrice,
                inventory : req.body.inventory,
            }
            productModel.add(req.userId, product)
                .then((result) => {
                    console.log(result)
                })


                // .then((result) => {
                    // console.log(result)
                    // if(result.rowCount !== 0)
                    // {
                    //     console.log(result)
                    //     res.send({status:200, mess:'add product success'})
                    // }
                    // else
                    // {
                    //     res.send({status:400, mess:'add product fail'})
                    // }
                // })
        }
    }

    edit(req, res)
    {
        // if(!req.errorUpload)
        // {
        //     let product = {
        //         cateId :req.body.cateId,
        //         supId : req.body.supId,
        //         proName: req.body.proName,
        //         proImage: req.file.filename,
        //         proPrice : req.body.proPrice,
        //         inventory : req.body.inventory,
        //     }
        //     productModel.update(req.userId, product)
        //         .then((result) => {
        //             console.log(result)
        //             // if(result.rowCount !== 0)
        //             // {
        //             //     console.log(result)
        //             //     res.send({status:200, mess:'add product success'})
        //             // }
        //             // else
        //             // {
        //             //     res.send({status:400, mess:'add product fail'})
        //             // }
        //         })
        // }
    }

    delete()
    {

    }

}

module.exports = new ProductController()