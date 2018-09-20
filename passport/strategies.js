const LocalStrategy = require('passport-local')
const config = require('../config/config')

module.exports = Strategies = {
    
    LocalStrategy = new LocalStrategy(config.passport, (req, username, password, done) => {
        return done(null, "hello result", {
            err: null,
            result: "hello result",
            msg: "this is the message"
        })
    })

}