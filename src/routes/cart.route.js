const express = require('express')
const route = express.Router()
const cartController = require('../app/controller/CartController')
const authentication = require("../middleware/authentication");


route.get('/',authentication.checkCookieCustomer, cartController.getCart)
route.post('/add', authentication.checkCookieCustomer, cartController.addProToCart)
route.put('/increase-product-cart', authentication.checkCookieCustomer, cartController.increaseQuantity)
route.put('/reduce-product-cart', authentication.checkCookieCustomer, cartController.reduceQuantity)
route.delete('/delete-product-cart', authentication.checkCookieCustomer, cartController.deleteProductCart)
route.post('/place-order', authentication.checkCookieCustomer, cartController.placeOrder)
route.get('/oldOrder', authentication.checkCookieCustomer, cartController.getOldOrder)


module.exports = route