const database = require('../../config/database/connect')

class UserModel
{
    getUser(username, password) {
        return database.query(`select user_id, role
                               from users
                               where username = '${username}' and password = '${password}'`)
    }

    getInfoUser(userId){
        return database.query(`select * from users where user_id = ${userId}`)
            .then((result) => {
                return result.rows
            })

    }
}

module.exports = new UserModel