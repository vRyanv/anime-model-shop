const express = require('express')
const route = express.Router()
const cartController = require('../app/controller/CartController')
const authentication = require("../middleware/authentication");


route.get('/', (req, res, next) => authentication.checkCookieCustomer(req, res, next),cartController.getCart)
route.put('/update-quantity-product-cart', (req, res, next) => authentication.checkCookieCustomer(req, res, next),cartController.addQuantityProductCart)
route.delete('/delete-product-cart', (req, res, next) => authentication.checkCookieCustomer(req, res, next),cartController.deleteProductCart)
route.post('/place-order', (req, res, next) => authentication.checkCookieCustomer(req, res, next),cartController.placeOrder)
route.get('/oldOrder', (req, res, next) => authentication.checkCookieCustomer(req, res, next),cartController.getOldOrder)


module.exports = route