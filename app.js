const express = require('express')
const req = require('express/lib/request')
const path = require('path')
var app = express()
var x = path.join(__dirname, '/public')
console.log(x)
app.set('views', path.join(__dirname, '/public/views'))
app.use(express.static(path.join(__dirname, 'public')))
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


app.listen(3001)