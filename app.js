'use strict'
const express = require('express')
require('dotenv').config()
var cookieParser = require('cookie-parser')
const app = express()
const HymnRouter = require('./api/hymn')
const AccountRouter = require('./api/account')
const mongoose = require('mongoose')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')

app.use(express.urlencoded(config.urlencode))
app.use(cookieParser());
app.use(express.json())
app.use(helmet())

app.use(cors())

/**
 * Setup mongoose db to connect to this api 
 */
mongoose.connect(config.database.connectionString, {
    useNewUrlParser: true
})


var db = mongoose.connection;
db.on('error', (err) => {
})// console.error.bind(console, 'connection error:'));
db.once('open', function() {


});

/**
 * Routes
 */
app.use('/api/hymns', HymnRouter);
app.use('/api/account', AccountRouter);

module.exports = app