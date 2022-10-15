const cartModel = require('../model/CartModel')
const productModel = require('../model/ProductModel')

class CartController{

    addProToCart(req, res){
        let proId = req.body.proId
        let orderId = req.cartId

        const handleAddToCart = async () => {
            let existPro = await cartModel.isExistPro(orderId, proId)
            if(existPro.rowCount === 0){
                var proPrice = await productModel.getProPrice(proId)
                    proPrice =   parseFloat(proPrice.substring(1))
                let addToCart = await cartModel.addToCart(orderId, proId, proPrice)
                if(addToCart.rowCount !== 0){
                    res.send({status:200, mess: 'add to cart success'})
                } else {
                    res.send({status:200, mess: 'add to cart fail'})
                }
            } else {
                res.send({status:400, mess: 'product is exist in cart'})
            }
        }
        handleAddToCart()
    }

    getCart(req, res)
    {
        cartModel.getProDuctInCart(req.cartId).then((result) => {
            res.render('client/cart.ejs', {cartList: result.rows})
        })
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