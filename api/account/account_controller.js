'use strict'

const passport = require('passport')

exports.RegisterUser = (req, res, next) => {
    passport.authenticate('account-register', (err, result, info) => {
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

exports.Login = (req, res) => {
        passport.authenticate('account-login', (err, result, info) => {
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


