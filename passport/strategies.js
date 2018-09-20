const LocalStrategy = require('passport-local').Strategy
const config = require('../config/config')
const account_service = require('../api/service/account_service')
const bcrypt = require('bcrypt')

module.exports = Strategies = {
    
    LocalStrategy : new LocalStrategy(
        config.passport, 
        (req, username, password, done) => {

            account_service.find_user(username).then( user => {
                if (user) {

                    // Hash the password
                    //bcrypt.hash(password, 10, (err, hash) =>)
                    bcrypt.compare(password, user.password, (err, same) => {
                        if (err) {

                        }
                        if (same) {
                            return done(null, null, {
                                statusCode: 200,
                                message: ''
                            })
                        } else {
                            return done(null, null, {
                                statusCode: 401,
                                message: 'Password or username is incorrect'
                            })
                        }
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