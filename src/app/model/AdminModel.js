const database = require('../../config/database/connect')

class AdminModel
{

    getAdmin(username, password)
    {
        return database.query(`select * from users where username = ${username} and password = ${password}`)
    }
}