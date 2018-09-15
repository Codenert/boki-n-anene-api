const express = require('express')
const app = express()
const hymn_router = require('./routes/hymn')

app.use('/api/hymns', hymn_router)

module.exports = app