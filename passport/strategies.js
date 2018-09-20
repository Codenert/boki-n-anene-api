const LocalStrategy = require('passport-local').Strategy
const config = require('../config/config')
const account_service = require('../api/service/account_service')

module.exports = Strategies = {
    
    LocalStrategy : new LocalStrategy(
        config.passport, 
        (req, username, password, done) => {

            account_service.find_user(username).then( result => {
                if (result) {
                    return done(null, result, {
                        result: result
                    })
                } else {
                    return done(null, null, {
                        message: 'not found'
                    })
                }

            }).catch(err => {
                return done(err)
            })

            
        }
    )

}