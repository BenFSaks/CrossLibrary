const express = require('express')
const bodyParser = require('body-parser')
const user = require('./models/user.js')
const path = require('path')
var passport = require('passport')
const session = require('express-session')
var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/public/views'))
app.use(express.static(path.join(__dirname, 'public')))
// Session Storage
if(process.env.NODE_ENV !== 'production') require('dotenv').config() 
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } //Set the expiration time of the cookie
}))


var db = require('./config/database.js')
/* 
db.connect((err) =>{
  if(err) throw err
  console.log('My Sql connected...')
})*/




app.get('/createtable', (req,res) =>{
  let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), firstName VARCHAR(225), lastName VARCHAR(225), hashedPassword VARCHAR(225), PRIMARY KEY (id))'
  db.query(sql, (err,result) =>{
    if(err) throw err
    console.log(result)
    res.send('Database created table')
  })
})
app.get('/droptable',(req,res) =>{
  let sql = "DROP TABLE users"
  db.query(sql, (err,result) =>{
    if (err) throw err
    res.send('Database dropped table')
  })
})


app.get('/signup', (req,res)=>{
  res.render("signup.ejs",{
    name: 'Ben'
  })
})
app.get('/login', (req,res)=>{
  res.render("login.ejs")
})

app.get('/', (req,res)=>{
  res.redirect('/signup')
})
app.get('/shelf', (req,res) =>{
  res.render("shelf.ejs")
})

let userCreater = user.user.User
app.post('/signup', (req,res) =>{
  let user1 = new userCreater(req.body.fname, req.body.lname, req.body.email)
  console.log(user1)

})
app.post('/shelf', (req,res) =>{
  //console.log("hey wow")
  console.log(user1)
})
app.get('/form', (req,res)=>{
  res.render("form.ejs")
})

app.listen(3000)
console.log("http://www.localhost:3000")
