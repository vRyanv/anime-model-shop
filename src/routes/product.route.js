const express = require('express')
const route = express.Router()
const productController = require('../app/controller/ProductController')
const authentication = require("../middleware/authentication");
const upload = require("../middleware/storage");

//get site
route.get('/add', authentication.checkCookieAdmin, productController.getAdd)
route.get('/edit/:id', authentication.checkCookieAdmin, productController.getEdit)
route.get('/', authentication.checkCookieAdmin, productController.getProductList)
route.get('/category/:id', authentication.checkCookieAdmin, productController.clientGetProFollowCate)
route.get('/search/:name',  authentication.checkCookieAdmin, productController.searchPro)
route.get('/client-search/:name', productController.clientSearchPro)

// CRUD
route.post('/add', authentication.checkCookieAdmin, upload.single('proImage'), productController.add)
route.post('/edit', authentication.checkCookieAdmin, upload.single('proImage'),productController.edit)
route.delete('/delete', authentication.checkCookieAdmin, productController.delete)

module.exports = route