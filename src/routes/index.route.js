const authentication = require('../middleware/authentication')
const siteRouter = require('./site.route')
const productRouter = require('./product.route')
const categoryRouter = require('./category.route')
const supplierRouter = require('./supplier.route')
const cartRouter = require('./cart.route')
const registerRouter = require('./register.route')
const supperAdminRouter = require('./supperAdmin.route')


function route(app)
{

    app.use('/loginProcess', (req, res) => { authentication.checkLogin(req, res) } )
    app.use('/register', registerRouter)

    app.use('/product', productRouter)
    app.use('/category', categoryRouter)
    app.use('/supplier', supplierRouter)
    app.use('/cart', cartRouter)
    app.use('/supper-admin', supperAdminRouter)

    //page
    app.use('/', siteRouter)

    //404
    app.use('*', siteRouter)
}

module.exports = route