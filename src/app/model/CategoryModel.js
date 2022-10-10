const database = require('../../config/database/connect')

class CategoryModel
{
    getCateList()
    {
        return database.query(`select * from category`)
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

module.exports = new CategoryModel