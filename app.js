const express = require('express')
const app = express()
const hymn_router = require('./routes/hymn')
const secret_router = require('./routes/secret')
const mongoose = require('mongoose')

/**
 * Setup mongoose db to connect to this api 
 */
mongoose.connect(process.env.DATABASE_READ_ONLY_CONNECTION_STRING, {
    useNewUrlParser: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

/**
 * Routes
 */
app.use('/secret', secret_router)
app.use('/api/hymns', hymn_router)


module.exports = app