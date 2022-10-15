const express = require('express')
const route = express.Router()
const supperAdminController = require('../app/controller/SupperAdminController')
const authentication = require("../middleware/authentication")

//shop
route.get('/shop/management', authentication.checkCookieAdmin, supperAdminController.shopManagement)
route.get('/shop/add', authentication.checkCookieAdmin, supperAdminController.addShop)
route.post('/shop/add', authentication.checkCookieAdmin, supperAdminController.addShopProcess)
route.get('/shop/edit/:id', authentication.checkCookieAdmin, supperAdminController.editShop)
route.post('/shop/edit/', authentication.checkCookieAdmin, supperAdminController.editShopProcess)

//staff
route.get('/staff/management', authentication.checkCookieAdmin,supperAdminController.staffManagement)
route.get('/staff/add', authentication.checkCookieAdmin, supperAdminController.addStaff)
route.post('/staff/add', authentication.checkCookieAdmin, supperAdminController.addStaffProcess)
route.get('/staff/edit/:userId', authentication.checkCookieAdmin, supperAdminController.editStaff)
route.post('/staff/edit', authentication.checkCookieAdmin, supperAdminController.editStaffProcess)


route.get('/', authentication.checkCookieAdmin, supperAdminController.statistical)


module.exports = route