const cartModel = require('../model/CartModel')
const productModel = require('../model/ProductModel')
const userModel = require('../model/UserModel')

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

    increaseQuantity(req, res)
    {
        let proId = req.body.proId
        let orderDetailId = req.body.orderDetailId

        const handleIncrease = async () => {
            let quantityAndPricePro = await cartModel.getInfoProInCart(orderDetailId,proId)
            if(quantityAndPricePro.length > 0){
                let quantity = quantityAndPricePro[0].quantity + 1
                let proPrice = quantityAndPricePro[0].pro_price
                let totalPrice = parseFloat(proPrice.substring(1)) * quantity
                let inforUpdate = await cartModel.updateProInforInCart(orderDetailId, quantity, totalPrice)
                    if(inforUpdate.length !== 0){
                        res.send({status:200, product: inforUpdate[0]})
                    } else {
                        res.send({status:400, mess: 'Update quantity fail'})
                    }
            }
        }

        handleIncrease()
    }

    reduceQuantity(req, res){
        let proId = req.body.proId
        let orderDetailId = req.body.orderDetailId

        const handleReduce = async () => {
            let quantityAndPricePro = await cartModel.getInfoProInCart(orderDetailId,proId)
            if(quantityAndPricePro.length > 0){
                let quantity = quantityAndPricePro[0].quantity - 1
                let proPrice = quantityAndPricePro[0].pro_price
                let totalPrice = parseFloat(proPrice.substring(1)) * quantity
                let inforUpdate = await cartModel.updateProInforInCart(orderDetailId, quantity, totalPrice)
                if(inforUpdate.length !== 0){
                    res.send({status:200, product: inforUpdate[0]})
                } else {
                    res.send({status:400, mess: 'Update quantity fail'})
                }
            }
        }
        handleReduce()
    }


    deleteProductCart(req, res)
    {
        let orderDetailId = req.body.orderDetailId
        cartModel.deleteProductInCart(orderDetailId).then((result) => {
            if(result !== 0){
                res.send({status:200, mess: 'Delete product in cart success'})
            } else {
                res.send({status:200, mess: 'Delete delete product in cart fail'})
            }
        })
    }

    getOrderInfo(req, res){
        let orderId = req.cartId
        let userId = req.userId
        const createOrder = async () => {
            const orderInfo = await cartModel.getOrderInfo(orderId)
            const proTotalPrice = await cartModel.getProTotalPrice(orderId)
            const customerInfo = await userModel.getInfoUser(userId)

            if(orderInfo.length !== 0 && proTotalPrice.length !== 0){
                var currentDate = new Date();
                orderInfo[0].orderDate = currentDate.toJSON().substring(0, 10)
                currentDate.setDate(currentDate.getUTCDate() + 7);
                orderInfo[0].deliveryDate = currentDate.toJSON().substring(0, 10)
                orderInfo[0].deliveryPrice = '$3'
                orderInfo[0].totalProPrice = proTotalPrice[0].price
                orderInfo[0].totalPayment = parseFloat(proTotalPrice[0].price.substring(1)) + 3
                orderInfo[0].userInfo = {
                    address : customerInfo[0].address,
                    fullName : customerInfo[0].fullname,
                    phone : customerInfo[0].phone
                }
                console.log(orderInfo)
                res.send({status:200, orderInfo: orderInfo[0]})
            }
        }
        createOrder()
    }

    placeOrder(req, res)
    {
        let userId = req.userId
        let orderId = req.cartId

        var currentDate = new Date();
        let orderDate = currentDate.toJSON().substring(0, 10)
        currentDate.setDate(currentDate.getUTCDate() + 7);
        let deliveryDate = currentDate.toJSON().substring(0, 10)
        var orderInfo = {orderId,orderDate,deliveryDate}
        cartModel.placeOrder(orderInfo).then((result) => {
            if(result !== 0){
                res.send({status:200, mess: 'payment success'})
            } else {
                res.send({status:200, mess: 'payment fail'})
            }
        })
    }

}

module.exports = new CartController