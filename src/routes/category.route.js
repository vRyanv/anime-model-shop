const express = require('express')
const route = express.Router()
const categoryController = require('../app/controller/CategoryController')
const authentication = require("../middleware/authentication")

//get site
route.get('/add', authentication.checkCookieAdmin, categoryController.getAdd)
route.get('/edit/:id', authentication.checkCookieAdmin, categoryController.getEdit)
route.get('/',authentication.checkCookieAdmin, categoryController.getCategoryList)

// CRUD
route.post('/add', authentication.checkCookieAdmin, categoryController.add)
route.put('/edit', authentication.checkCookieAdmin, categoryController.edit)
route.delete('/delete', authentication.checkCookieAdmin, categoryController.delete)

module.exports = route