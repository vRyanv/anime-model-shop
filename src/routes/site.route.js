const express = require('express')
const route = express.Router()
const siteController = require('../app/controller/SiteController')


// route.get('/admin', siteController.home)
route.get('/about', siteController.about)
route.get('/contact', siteController.contact)
route.get('/shop', siteController.shop)
route.get('/', siteController.home)

module.exports = route