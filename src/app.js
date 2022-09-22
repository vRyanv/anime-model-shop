const port = 2108
const path = require('path')

//add library dev
const morgan = require('morgan')

//add library
const express = require('express')
const ejs = require('ejs')
const route = require('./routes/index.route')
const database = require('./config/database/connect')

database.connect()
const app = express()

//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))
//middleware to get post method
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//HTTP logger for dev
app.use(morgan('combined'))

//Template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/view'))

//Rout inita
route(app)

app.listen( port, () => console.log(`listen request: port: ${port}`))