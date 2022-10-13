const database = require('../config/database/connect')
const userModel = require('../app/model/UserModel')
const cartModel = require('../app/model/CartModel')
const jwt = require('jsonwebtoken')
const tokenKey = '21082002'
const tokenName = '__token_user'

class Authentication
{
    checkLogin(req, res)
    {
        function createToken(user) {
            res.cookie(tokenName,jwt.sign({
                orderId: user.orderId,
                userId:user.userId,
                userRole: user.role
            }, tokenKey))
            user.role === '0' ?   res.send({status:200, role: 'user'}) : res.send({status:200, role: 'admin'})
        }

        let username = req.body.username
        let pass = req.body.password
        const handleLogin = async() => {
            const user = await userModel.getUser(username, pass)
            if(user.rowCount !== 0){
                const userId = user.rows[0].user_id
                const cart = await cartModel.getCart(userId)
                var userInfor = {
                    userId: null,
                    role: null,
                    orderId: null
                }
                if(cart.rowCount !== 0){
                    userInfor.userId = userId
                    userInfor.role = user.rows[0].role
                    userInfor.orderId = cart.rows[0].order_id
                    createToken(userInfor)
                } else {
                    const newCart = await cart.createCart(userId)
                    if(newCart.rowCount !== 0){
                        userInfor.userId = userId
                        userInfor.role = user.rows[0].role
                        userInfor.orderId = newCart.rows[0].order_id
                        createToken(userInfor)
                    }
                }
            } else {
                res.send({status:400})
            }
        }
        handleLogin()

    }

    checkCookieAdmin(req, res, next)
    {
        try{
             let token = req.cookies.__token_user
             let decode = jwt.verify(token, tokenKey)
             req.userId = decode.userId
             req.userRole = decode.userRole
             if(req.userRole === '0')
             {
                 res.render('admin/authFail.ejs')
             } else {
			    next()
             }
        }catch (error){
            res.render('admin/authFail.ejs')
        }
    }

    checkCookieCustomer(req, res, next)
    {
        try{
            let token = req.cookies.__token_user
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.cartId = decode.orderId
            req.login = true
            next()
        }catch (error){
            req.login = false
            next()
        }
    }

}

module.exports = new Authentication