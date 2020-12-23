if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const usersRouther = require('./routes/users')
const projectsRouther = require('./routes/projects')
const homeRouther = require('./routes/home')
const aboutRouther = require('./routes/about')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded( {limit: '1mb', extended: false} ))

app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true ,useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/users', usersRouther)
app.use('/projects', projectsRouther)
app.use('/home', homeRouther)
app.use('/about', aboutRouther)

app.listen(process.env.PORT || 3000)