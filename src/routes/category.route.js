const express = require('express')
const route = express.Router()
const categoryController = require('../app/controller/CategoryController')
const authentication = require("../middleware/authentication")

//get site
route.get('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.getAdd)
route.get('/edit/:id', (req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.getEdit)
route.get('/',(req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.getCategoryList)

// CRUD
route.post('/add', (req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.add)
route.put('/edit', (req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.edit)
route.delete('/delete', (req, res, next) => authentication.checkCookieAdmin(req, res, next), categoryController.delete)

module.exports = route