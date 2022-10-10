const express = require('express')
const route = express.Router()
const supperAdminController = require('../app/controller/SupperAdminController')
const authentication = require("../middleware/authentication")

//shop
route.get('/shop/management', (req, res, next) => authentication.checkCookieAdmin(req, res, next), supperAdminController.shopManagement)
route.get('/shop/add', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.addShop)
route.post('/shop/add', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.addShopProcess)

//staff
route.get('/staff/management', (req, res, next) =>authentication.checkCookieAdmin(req, res, next),supperAdminController.staffManagement)
route.get('/staff/add', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.addStaff)
route.post('/staff/add', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.addStaffProcess)
route.get('/staff/edit/:userId', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.editStaff)
route.post('/staff/edit', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.editStaffProcess)


route.get('/', (req, res, next) =>authentication.checkCookieAdmin(req, res, next), supperAdminController.statistical)


module.exports = route