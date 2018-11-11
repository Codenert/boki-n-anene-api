const LocalStrategy = require('passport-local').Strategy
const config = require('../../config/config')
const UserService = require('./user_service')
const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const RoleModel = require('../model/role_model')


/**
 * These are the strategies to be used by the passport
 * for registering and login a user
 * @author Kateti Mareko
 * @since 27-08-18
 */
module.exports = Strategies = {

    /**
     * This strategy is dealing with registering a new user. Its done by hashing the password and then create 
     * a new user with the hash password and stored in the database
     */
    RegisterStrategy : new LocalStrategy(
        config.passport,
        (req, username, password, done) => {
            bcrypt.hash(password, 10, (err, encrypted) => {
                
                if (err) {
                    return done(err, null)
                }

                if (encrypted) {
                    UserService.CreateUser(username, encrypted, req.body.email, req.body.role).then(result => {
                        return done(null, result)
                    }).catch(err => {
                        return done(err, null)
                    })
                }
            })
        }
    ),
    
    /**
     * This strategy handle authenticating the user. Its done by checking if the user is in the system.
     * If the user exist then it will create a signed token with a role type as a payload and then send it to the user
     */
    LocalStrategy : new LocalStrategy(
        (username, password, done) => {

            /**
             * Find the user first
             */
            UserService.FindUser(username).then( user => {
                if (user) {

                    /**
                     * Compare the hashed password stored in the database
                     * against what the user is providing
                     */
                    bcrypt.compare(password, user.password, (err, same) => {
                        if (err) {
                            return done(err)
                        }
                        if (same) {
                            // generate a token

                            // get the role
                            RoleModel.findById(user._role, (err, res) => {
                                if (res) {
                                    var token = jsonWebToken.sign({ id: user.id, role: res.name }, process.env.JWT_SECRET, config.token);
                                    return done(null, token, {
                                        statusCode: 200,
                                    })
                                }
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
                        statusCode: 401,
                        message: 'Password or username is incorrect'
                    })
                }

            }).catch(err => {
                return done(err)
            })

            
        }
    ),

    



}