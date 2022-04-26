require('dotenv').config()
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB

})

con.connect((err) =>{
    if(err) throw err
    console.log("Connected!")
})
module.exports = con