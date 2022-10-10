const database = require('../../config/database/connect')

class SupplierModel
{
    getSupList()
    {
        return database.query(`select * from supplier`)
            .then((result) => {
                return result.rows
            })
    }


    add(cateName)
    {

    }

    update(cateId, cateName)
    {

    }

    delete()
    {

    }
}

module.exports = new SupplierModel