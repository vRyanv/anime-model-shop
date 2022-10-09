const database = require('../../config/database/connect')
class RegisterController{
    getUsername(req, res)
    {
        database.query(`select * from users where username = '${req.params.username}'`)
            .then((result) => {
                if(result.rowCount === 0)
                {
                    res.send({status:200, mess: 'valid'})
                }
                else
                {
                    res.send({status:400, mess: 'invalid'})
                }

            })
    }

    registerProcess(req, res)
    {
        database.query(`select * from users where username = '${req.body.username}'`)
            .then((result) => { console.log(result)
                if(result.rowCount === 0)
                {
                    database.query(`INSERT INTO users(username, password, fullname, phone, address, role)
                                    VALUES ('${req.body.username}', '${req.body.password}', '${req.body.fullName}', '${req.body.phone}', '${req.body.address}','0')`)
                        .then((result) => {
                            if (result.rowCount !== 0) {
                                res.send({status:200,mess: 'register success'})
                            } else{
                                    res.send({status:400, mess: 'register fail'})
                                }
                        })
                }
                else
                {
                    res.send({status:400, mess: 'Duplicate username'})
                }
            })
    }

}

module.exports = new RegisterController