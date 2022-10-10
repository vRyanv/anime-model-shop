const express = require('express')
const route = express.Router()
const productController = require('../app/controller/ProductController')
const authentication = require("../middleware/authentication");
const upload = require("../middleware/storage");

//get site
route.get('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), productController.getAdd)
route.get('/edit/:id', (req, res, next) => authentication.checkCookieAdmin(req, res, next), productController.getEdit)
route.get('/',(req, res, next) => authentication.checkCookieAdmin(req, res, next), productController.getProductList)

// CRUD
route.post('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), upload.single('proImage'), productController.add)
route.put('/edit', (req, res, next) => authentication.checkCookieAdmin(req, res, next), productController.edit)
route.delete('/delete', (req, res, next) => authentication.checkCookieAdmin(req, res, next), productController.delete)

module.exports = route