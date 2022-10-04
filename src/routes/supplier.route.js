const express = require('express')
const route = express.Router()
const supplierController = require('../app/controller/SupplierController')
const authentication = require("../middleware/authentication")

//get site
route.get('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.getAdd)
route.get('/edit/:id', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.getEdit)
route.get('/',(req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.getSupplierList)

// CRUD
route.post('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.add)
route.put('/edit', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.edit)
route.delete('/delete', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supplierController.delete)

module.exports = route