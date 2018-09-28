'use strict'

const passport = require('passport')

exports.RegisterUser = (req, res) => {
    passport.authenticate('account-register', (err, result, info) => {
        if (result) {
            res.status(200).send({
                message: 'User created'
            })
        }

        if (err) {

            // find information about the err
            if (err.code === 11000) {         // uniqueness failed error
                var value = err.errmsg.split('"')[1]
                var temp = err.errmsg.split('$')[1]
                var property = temp.substring(0,temp.indexOf('_'))
                res.status(400).send(property + " '" + value + "' is already taken")
            } else {                          // required error
                res.status(400).send(err.message)//"Some of the field are required")
            }

        }

        
    })(req,res)
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


