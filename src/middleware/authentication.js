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
                    res.send({status:200})
                }
                else
                {
                    res.send({status:400})
                }
            })
    }

    checkCookie(req, res, next)
    {
        try{
             let token = req.cookies.__token_user
             let decode = jwt.verify(token, tokenKey)
             req.id = decode.id
             req.role = decode.role
             next()
        }catch (error){
            res.render('admin/authFail.ejs')
        }
    }

}

module.exports = new Authentication