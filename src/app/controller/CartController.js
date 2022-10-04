const database = require('../../config/database/connect')
class CartController{

    getCart(req, res)
    {
        res.render('client/cart.ejs')
    }

    getOldOrder(req, res)
    {
        res.send('getOldOrder')
    }

    addQuantityProductCart(req, res)
    {
        res.send('add quantity')
    }

    deleteProductCart(req, res)
    {
        res.send('delete product cart')
    }

    placeOrder(req, res)
    {
        res.send('place order')
    }

}

module.exports = new CartController