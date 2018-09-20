const LocalStrategy = require('passport-local').Strategy
const config = require('../config/config')
const account_service = require('../api/service/account_service')
const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = Strategies = {
    
    LocalStrategy : new LocalStrategy(
        config.passport, 
        (req, username, password, done) => {

            account_service.find_user(username).then( user => {
                if (user) {

                    bcrypt.compare(password, user.password, (err, same) => {
                        if (err) {
                            return done(err)
                        }
                        if (same) {

                            // generate a token
                            var token = jsonWebToken.sign({ email: user.email, id: user.id}, process.env.JWT_SECRET, config.token);
                            
                            return done(null, token, {
                                statusCode: 200,
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