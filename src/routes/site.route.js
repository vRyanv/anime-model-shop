const express = require('express')
const route = express.Router()
const siteController = require('../app/controller/SiteController')
const authentication = require("../middleware/authentication");


route.get('/login', siteController.login)
route.get('/logout', siteController.logout)
route.get('/register', siteController.register)

//admin
route.get('/dashboard', (req, res, next) => authentication.checkCookieAdmin(req, res, next), siteController.dashboard)
route.get('/supper-admin', (req, res, next) => authentication.checkCookieAdmin(req, res, next),siteController.dashboard)

//client
route.get('/', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.home)
route.get('/about', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.about)
route.get('/shop', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.shop)
route.get('/contact', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.contact)
route.get('/profile', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.profile)
route.get('/cart', (req, res, next) => authentication.checkCookieCustomer(req, res, next),siteController.cart)
route.get('/test',siteController.test)

route.get('*', siteController.page404)

module.exports = route