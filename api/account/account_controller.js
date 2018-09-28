'use strict'

const passport = require('passport')

exports.RegisterUser = (req, res) => {
    passport.authenticate('account-register', (err, result, info) => {
        console.log(err)
        if (result) {
            res.status(200).send({
                message: 'User created'
            })
        }

        if (info) {

            /**
             * Check more information about what property is duplicated
             */
            if (info.err.errmsg.indexOf("duplicate")) {
                // check which property is duplicated
                info.properties.forEach(property => {
                    console.log(property)
                    if (info.err.errmsg.indexOf(property) !== -1) {

                        res.status(400).send({
                            message: property + ' already exist'
                        })
                        return
                    }
                }); 

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


