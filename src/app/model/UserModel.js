const database = require('../../config/database/connect')

class UserModel
{

    getUser(username, password) {
        return database.query(`select user_id, role
                               from users
                               where username = '${username}' and password = '${password}'`)
    }



}

module.exports = new UserModel