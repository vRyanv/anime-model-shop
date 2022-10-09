const express = require('express')
const route = express.Router()
const registerController = require('../app/controller/RegisterController')

//get site
route.get('/get-user-name/:username', registerController.getUsername)
route.post('/process', registerController.registerProcess)


module.exports = route