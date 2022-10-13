const express = require('express')
const route = express.Router()
const siteController = require('../app/controller/SiteController')
const authentication = require("../middleware/authentication");


route.get('/login', siteController.login)
route.get('/logout', siteController.logout)
route.get('/register', siteController.register)

//admin
route.get('/dashboard', authentication.checkCookieAdmin, siteController.dashboard)
route.get('/supper-admin', authentication.checkCookieAdmin, siteController.dashboard)

//client
route.get('/', authentication.checkCookieCustomer, siteController.home)
route.get('/about', authentication.checkCookieCustomer,siteController.about)
route.get('/shop', authentication.checkCookieCustomer, siteController.shop)
route.get('/contact', authentication.checkCookieCustomer, siteController.contact)
route.get('/cart', authentication.checkCookieCustomer, siteController.cart)

route.get('*', siteController.page404)

module.exports = route