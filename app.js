const express = require('express')
const app = express()
const hymn_router = require('./api/routes/hymn')
const secret_router = require('./api/routes/secret')
const account_router = require('./api/routes/account')
const mongoose = require('mongoose')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const passport_stratety = require('./passport/strategies')

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
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

/**
 * Configure passport
 */
app.use(passport.initialize())
passport.use('local-sigin',passport_stratety.LocalStrategy)
passport.use('bearer', passport_stratety.BearerdStrategy)

/**
 * Routes
 */
app.use('/secret', secret_router)
app.use('/api/hymns', hymn_router)
app.use('/api/account', account_router)

module.exports = app