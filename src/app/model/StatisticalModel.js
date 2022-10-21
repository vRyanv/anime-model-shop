const database = require('../../config/database/connect')

class StatisticalModel{
    getRevenueAllShop(){
        return database.query(`select sum() `)
    }
}

module.exports = new StatisticalModel