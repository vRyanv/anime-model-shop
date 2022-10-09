const express = require('express')
const route = express.Router()
const supperAdminController = require('../app/controller/SupperAdminController')

//shop
route.get('/shop/management', supperAdminController.shopManagement)
route.get('/shop/add', supperAdminController.addShop)
route.post('/shop/add', supperAdminController.addShopProcess)

//staff
route.get('/staff/management', supperAdminController.staffManagement)
route.get('/staff/add', supperAdminController.addStaff)
route.post('/staff/add', supperAdminController.addStaffProcess)
route.get('/staff/edit/:userId', supperAdminController.editStaff)
route.post('/staff/edit', supperAdminController.editStaffProcess)





route.get('/', supperAdminController.statistical)


module.exports = route