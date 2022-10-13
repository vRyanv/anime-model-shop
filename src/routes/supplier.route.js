const express = require('express')
const route = express.Router()
const supplierController = require('../app/controller/SupplierController')
const authentication = require("../middleware/authentication")

//get site
route.get('/add', authentication.checkCookieAdmin, supplierController.getAdd)
route.get('/edit/:id', authentication.checkCookieAdmin, supplierController.getEdit)
route.get('/',authentication.checkCookieAdmin, supplierController.getSupplierList)

// CRUD
route.post('/add',  authentication.checkCookieAdmin, supplierController.add)
route.put('/edit',  authentication.checkCookieAdmin, supplierController.edit)
route.delete('/delete', authentication.checkCookieAdmin, supplierController.delete)

module.exports = route