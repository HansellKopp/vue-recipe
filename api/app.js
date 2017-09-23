'use strict'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var index = require('./routes/index')
var users = require('./routes/users')
var recipe = require('./routes/recipe')
var measure = require('./routes/measure')
var category = require('./routes/category')
var ingredient = require('./routes/ingredient')

var app = express()

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/index', index)
app.use('/users', users)
app.use('/recipe', recipe)
app.use('/measure', measure)
app.use('/category', category)
app.use('/ingredient', ingredient)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // return the error response
  res.status(err.status || 500)
  res.status(err.status || 500).json({message: res.locals.message, data: res.locals.error})
})

module.exports = app

