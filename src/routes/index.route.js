const siteRouter = require('./site.route')

function route(app)
{
    app.use('/', siteRouter)
    app.use('/about', siteRouter)
    app.use('/shop', siteRouter)
    app.use('/contact', siteRouter)
}

module.exports = route