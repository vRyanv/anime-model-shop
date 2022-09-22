const express = require('express')
const route = express.Router()
const siteController = require('../app/controller/SiteController')

route.get('/', siteController.home)
route.get('/admin', siteController.home)

module.exports = route