const express = require('express')
const route = express.Router()
const profileController = require('../app/controller/ProfileController')
const authentication = require("../middleware/authentication");


route.get('/', (req, res, next) => authentication.checkCookieCustomer(req, res, next),profileController.getProfile)
route.put('/update-profile', (req, res, next) => authentication.checkCookieCustomer(req, res, next),profileController.updateProfile)


module.exports = route