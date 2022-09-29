const authentication = require('../middleware/authentication')
const siteRouter = require('./site.route')
const productRouter = require('./product.route')


function route(app)
{
    //API
    app.use('/loginProcess', (req, res) => { authentication.checkLogin(req, res) } )
    app.use('/product', productRouter)

    //page
    app.use('/', siteRouter)

    //404
    app.use('*', siteRouter)
}

module.exports = route