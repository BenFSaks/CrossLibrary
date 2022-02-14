const express = require('express')
const path = require('path')
var app = express()
var x = path.join(__dirname, '/public')
console.log(x)
app.set('views', path.join(__dirname, '/public'))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
  res.render('hello.ejs')
})

app.listen(3001)
