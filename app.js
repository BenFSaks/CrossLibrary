const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var passport = require('passport')
const session = require('express-session')
const bcrypt = require('bcrypt')
const multer = require('multer')

const { Poppler } = require('node-poppler')

const pdf = require('pdf-poppler')
const pdfjs = require('pdfjs')
var app = express()
var MySQLStore = require('express-mysql-session')(session);
const uuid = require('uuid').v4


const con = require('./backend/db_connection')

var sessionStore = new MySQLStore({
}/* session store options */, con);
app.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}))


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/public/views'))
app.use(express.static(path.join(__dirname, 'public')))
if(process.env.NODE_ENV !== 'production') require('dotenv').config() 



const isAuth = (req, res, next) =>{
  if(req.session.isAuth){
    next()
  }else{
    res.redirect('/login')
  }

}
const isNotAuth = (req, res, next) =>{
  if(!req.session.isAuth){
    next()
  }else{
    res.redirect('/shelf')
  }
}




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
app.get('/clearusertable', (req,res) =>{
  con.query("DELETE FROM users",(err,result) =>{
    if(err) throw err
    res.send("User table cleared")
  })
})


app.get('/signup', isNotAuth, (req,res)=>{
  res.render("signup.ejs",{
    error: ''
  })
})
app.get('/login', isNotAuth, (req,res)=>{
  res.render("login.ejs")
})
app.post('/login', (req,res) =>{
  const checksql = `SELECT * FROM users WHERE email =?`
  let login_user;
  con.query(checksql,[req.body.email], async (err,result) =>{
    if(err) throw err
    //If User Does not Exist
    if(result.length === 0){
      res.redirect('/login')
    }else{
      login_user = result[0]
      const isMatch = await bcrypt.compare(req.body.password,login_user.password)
      //Password Matches password in database
      if (!isMatch) {
        return res.redirect('/login')
      } else {
        req.session.isAuth = true
        req.session.name = login_user.first_name
        req.session.email = login_user.email
        req.session.user_id = login_user.id
        console.log(req.session.user_id)
        res.redirect('/shelf')
      }
    }
  })
})

app.get('/', (req,res)=>{
  res.redirect('/signup')
})
app.get('/shelf', isAuth, (req,res) =>{
  const sql = `SELECT * FROM books WHERE user_id =?`
  con.query(sql,[req.session.user_id], async (err,result) =>{
    if(err) throw err
    res.render("shelf.ejs",{
      name: req.session.name,
      books: result
    })
  })
})

app.post('/signup', async (req,res) =>{
  const pass = req.body.password
  const hashPass = await bcrypt.hash(pass, 12)
  const checksql = `SELECT email FROM users WHERE email =?`
  con.query(checksql,[req.body.email], (err,result) =>{
    if(err) throw err
    //User Does not Exist
    if(result.length === 0){
      const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${req.body.fname}','${req.body.lname}','${req.body.email}','${hashPass}')`
      con.query(sql, (err,result) =>{
        if (err) throw err
        res.redirect('/login')
        console.log("Inserted User")
      })
    }else{
      res.render("signup.ejs",{
        error: "ERROR: Email in use"
      })
    }
  })


})
//PDF Storage 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: async (req, file, cb) => {
    
    const filename = `${uuid()}-${file.originalname}`
    cb(null, filename)
    const book_title = req.body.title
    const book_author_fname = req.body.author_fname
    const book_author_lname = req.body.author_lname
    const book_cover = req.body.cover || "NULL" 
    const book_path = path.join(__dirname, 'public','uploads', filename)
    const book_user_id = req.session.user_id
    //Take first image of pdf convert it to image

    const poppler = new Poppler()
    const options = {
      firstPageToConvert: 1,
      lastPageToConvert: 1,
      pngFile: true
    }
    const uuid_cover = uuid()
    const book_cover_path = path.join(__dirname, 'public', `img`, `${uuid_cover}`) 
    const res = await poppler.pdfToCairo(book_path, book_cover_path, options)
    console.log(res)
    const ops = {
      printAsJson: true
    }
    let ext 
    const pdfInfo = await poppler.pdfInfo(book_path, ops)
    console.log(pdfInfo.pages)
    if (pdfInfo.pages < 10){
      ext = "-1"
    }
    else if(pdfInfo.pages < 100){
      ext = "-01"

    }
    else if(pdfInfo.pages < 1000){
      ext = "-001"
    }
    else if(pdfInfo.pages < 10000){
      ext = "-0001"
    }
    // const opts = {
    // out_dir: path.join(__dirname, "public", "img"),
    // out_prefix: book_cover_path,
    // format: 'jpeg',
    // page: 1,
    // }
    // pdf.convert(book_path, opts)
    // .then(res =>{
    //     console.log()
    //   })
    // .catch(err =>{
    //   console.error(err)
    // })


    const sql = `INSERT INTO books (book_title, book_authorfname, book_authorlname, book_image, book_location, user_id) VALUES ('${book_title}', '${book_author_fname}','${book_author_lname}','${uuid_cover}${ext}.png', '${filename}', '${book_user_id}' )`
    con.query(sql, (err,result) => {
      if(err) throw err

    })
  }
})
const upload = multer({storage: storage})

app.post('/shelf', upload.single('pdf'),(req,res) =>{
  res.redirect('/shelf')
})
app.get('/form', (req,res)=>{
  res.clearCookie("connect.sid")
  res.render("form.ejs")
})
app.get('/logout', (req,res)=>{
  res.clearCookie("connect.sid")
  res.redirect('/login')
})
app.get('/readbook/:id', (req,res) =>{
  console.log(req.params.id)
  let sql = `SELECT * FROM books WHERE book_id = ${req.params.id}`
  con.query(sql, (err,result) =>{
    if(err) throw err
    console.log(result)
    res.render('book.ejs',{
      book: result[0]})
  })
})
app.listen(3000)
console.log("http://www.localhost:3000")
