const express = require('express')
const route = express.Router()
const supperAdminController = require('../app/controller/SupperAdminController')
const authentication = require("../middleware/authentication")
const siteController = require("../app/controller/SiteController");


route.get('/', authentication.checkCookieAdmin, siteController.dashboard)

//shop
route.get('/shop/management', authentication.checkCookieAdmin, supperAdminController.shopManagement)
route.get('/shop/add', authentication.checkCookieAdmin, supperAdminController.addShop)
route.post('/shop/add', authentication.checkCookieAdmin, supperAdminController.addShopProcess)
route.get('/shop/edit/:id', authentication.checkCookieAdmin, supperAdminController.editShop)
route.post('/shop/edit', authentication.checkCookieAdmin, supperAdminController.editShopProcess)


//staff
route.get('/staff/management', authentication.checkCookieAdmin, supperAdminController.staffManagement)
route.get('/staff/add', authentication.checkCookieAdmin, supperAdminController.addStaff)
route.post('/staff/add', authentication.checkCookieAdmin, supperAdminController.addStaffProcess)
route.get('/staff/edit/:userId', authentication.checkCookieAdmin, supperAdminController.editStaff)
route.post('/staff/edit', authentication.checkCookieAdmin, supperAdminController.editStaffProcess)

//statistical
route.get('/get-revenue-all-shop', authentication.checkCookieAdmin, supperAdminController.getRevenueAllShop)
route.post('/get-revenue-all-shop-by-date', authentication.checkCookieAdmin, supperAdminController.getRevenueAllShop)


module.exports = route