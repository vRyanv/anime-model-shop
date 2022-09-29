const {Pool} = require('pg');
try{
    module.exports = new Pool({
        connectionString: '\n' +
            'postgres://eapvjprffrtqvr:4618054b0d7b0000728895eaf52cfb6e7c8022af7449858aad3c9779748bb562@ec2-52-207-90-231.compute-1.amazonaws.com:5432/dkg9aljjkcpsr',
        ssl: {
            rejectUnauthorized: false
        }
    });
        console.log('Connect database success')
}catch (error){
        console.log('Connect database fail (x_x)')
}


// try{
//     await mongoose.connect('mongodb+srv://khangMogonDB:21082002@learn-mongodb.txma9sp.mongodb.net/learn-mongoDB')
//     console.log('Database connect successfully <3')
// }catch (error){
//     console.log('Database connect failure (x_x)')
// }



// pool.query(`SELECT * FROM donhang;`, (err, res) => {
//     if (err) {
//         console.log("Error - Failed to select all from Users");
//         console.log(err);
//     }
//     else{
//         console.log(res.rows);
//     }
// });