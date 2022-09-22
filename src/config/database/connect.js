const mongoose = require('mongoose')

async function connect()
{
    try{
        await mongoose.connect('mongodb+srv://khangMogonDB:21082002@learn-mongodb.txma9sp.mongodb.net/learn-mongoDB')
        console.log('Database connect successfully <3')
    }catch (error){
        console.log('Database connect failure (x_x)')
    }
}

module.exports = {connect}