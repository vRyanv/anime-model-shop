const database = require('../../config/database/connect')
class ProfileController{

    getProfile(req, res)
    {
        res.send('profile')
    }

    updateProfile(req, res)
    {
        res.send('edit profile')
    }

}

module.exports = new ProfileController