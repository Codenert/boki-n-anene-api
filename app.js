const express = require('express')
const app = express()
const hymn_router = require('./api/routes/hymn')
const secret_router = require('./api/routes/secret')
const mongoose = require('mongoose')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const passwort_stratety = require('./passport/strategies')

app.use(helmet())

app.use(cors(config.cors))
/**
 * Setup mongoose db to connect to this api 
 */
mongoose.connect(config.database.connectionString, {
    useNewUrlParser: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

/**
 * Configure passport
 */
app.use(passport.initialize())
passport.use(passwort_stratety.LocalStrategy)

/**
 * Routes
 */
app.use('/secret', secret_router)
app.use('/api/hymns', hymn_router)


module.exports = app