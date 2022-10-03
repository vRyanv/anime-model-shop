const database = require('../config/database/connect')
const jwt = require('jsonwebtoken')
const tokenKey = '21082002'
const tokeName = '__token_user'

class Authentication
{
    checkLogin(req, res)
    {
        let username = req.body.username
        let pass = req.body.password
        database.query(`select * from admin where username = '${username}' and password = '${pass}'`)
            .then(result => {
                if (result.rowCount > 0)
                {
                    res.cookie(tokeName,jwt.sign({
                        id:result.rows[0].id,
                        role: result.rows[0].role
                    }, tokenKey))
                    result.rows[0].role === '0' ?   res.send({status:200, role: 'user'}) : res.send({status:200, role: 'admin'})
                }
                else
                {
                    res.send({status:400})
                }
            })
    }

    checkCookieAdmin(req, res, next)
    {
        try{
             let token = req.cookies.__token_user
             let decode = jwt.verify(token, tokenKey)
             req.id = decode.id
             req.role = decode.role
             if(req.role === '0')
             {
                 res.render('admin/authFail.ejs')
             }
             next()
        }catch (error){
            res.render('admin/authFail.ejs')
        }
    }

    checkCookieCustomer(req, res, next)
    {
        try{
            let token = req.cookies.__token_user
            let decode = jwt.verify(token, tokenKey)
            req.id = decode.id
            req.login = true
            next()
        }catch (error){
            req.login = false
            next()
        }
    }

}

module.exports = new Authentication