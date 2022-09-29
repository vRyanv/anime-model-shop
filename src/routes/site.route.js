const express = require('express')
const route = express.Router()
const siteController = require('../app/controller/SiteController')
const authentication = require("../middleware/authentication");


route.get('/', siteController.login)
route.get('/logout', siteController.logout)
route.get('/dashboard', (req, res, next) => authentication.checkCookie(req, res, next), siteController.dashboard)
route.get('/supper-admin', (req, res, next) => authentication.checkCookie(req, res, next),siteController.supperAdminPage)
route.get('*', siteController.page404)

module.exports = route