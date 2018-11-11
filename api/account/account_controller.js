'use strict'

const passport = require('passport')

/**
 * Account controller handles registering and login logic
 * @author Kateti Mareko
 * @since 27-08-18
 */


let register_strategy = 'account-register';
let account_login_strategy = 'account-login';

/**
 * Register a new user
 */
exports.RegisterUser = (req, res, next) => {
    passport.authenticate(register_strategy, (err, result, info) => {
        if (result) {
            res.status(200).send({
                message: 'User created'
            })
        }

        if (err) {
            next(err)
        }

        
    })(req,res, next)
}

/**
 * Login a user
 */
exports.Login = (req, res) => {
        passport.authenticate(account_login_strategy, (err, result, info) => {
            console.log(info)
            if (result) {
                res.status(info.statusCode).send({
                    _access_token: result
                })
            } else if (info) {
                res.status(info.statusCode)
                res.send(info.message)
            } else {
                res.send(err)
            }
        })(req, res)
}


