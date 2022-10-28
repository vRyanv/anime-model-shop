const port = 2108
const path = require('path')

//add library dev
const morgan = require('morgan')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')

const route = require('./routes/index.route')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const chatApp = require('./service/realTime/chatApp')

//server socket
chatApp(io)

//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//HTTP logger for dev
app.use(morgan('combined'))

//Template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/view'))

//Rout init
route(app)

app.listen( process.env.PORT || 2108, () => console.log(`listen request`))