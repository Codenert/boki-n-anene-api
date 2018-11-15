'use strict'
const express = require('express')
const app = express()
const hymn_router = require('./api/hymn')
const account_router = require('./api/account')
const mongoose = require('mongoose')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const account_strategy = require('./api/account/strategies')
const authorize_strategy = require('./api/middleware/authorization/strategy')
const role_router = require('./api/role')

app.use(express.urlencoded(config.urlencode))
app.use(express.json())
app.use(helmet())

app.use(cors(config.cors))
/**
 * Setup mongoose db to connect to this api 
 */
mongoose.connect(config.database.connectionString, {
    useNewUrlParser: true
})
var db = mongoose.connection;
db.on('error', (err) => {
  console.log("not connected")
})// console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')


});

/**
 * Configure passport
 */
app.use(passport.initialize())
passport.use('account-register', account_strategy.RegisterStrategy)
passport.use('account-login', account_strategy.LocalStrategy)

passport.use('bearer', authorize_strategy.BearerStrategy)

/**
 * Routes
 */
app.use('/api/hymns', hymn_router)
app.use('/api/account', account_router)
app.use('/api/role', role_router)

module.exports = app