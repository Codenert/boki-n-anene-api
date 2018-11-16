'use strict'

const passport = require('passport')
const UserService = require('./user_service')
const config = require('../../config/config')
const nodemailer = require('nodemailer');
const CodeService = require('./code_service')
const crypto = require('crypto')
const jsonWebToken = require('jsonwebtoken')

/**
 * Configure nodemailer
 */
var transporter = nodemailer.createTransport({
    service: process.env.transportService,
    auth: {
           user: process.env.email,
           pass: process.env.password
       }
   });
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

exports.VerifyCode = (req, res) => {
    console.log('verify')
    var id = req.query.id
    var code = req.body.code

    // verify the code
    CodeService.GetCode(id).then (codeModel => {

        if (codeModel) {

            // compare the codes
            if (codeModel.code == code) {
                // issue a token and send it to the client
                // get the user with a role
                UserService.GetUser(id).then(user => {
                    if (user) {
                        CodeService.RemoveCode(id)
                        var token = jsonWebToken.sign({ id: user[0]._id, role: user[0].role }, process.env.JWT_SECRET, config.token);
                        res.send({
                            _access_token: token
                        })


                    }
                }).catch(err => {
                    res.status(500).end()
                })
            } else {
                res.status(401).end()
            }

        } else {
            res.status(401).end()
        }
    }).catch(err => {
        res.status(500).end()
    })

}

/**
 * Login a user
 */
exports.Login = (req, res) => {
        passport.authenticate(account_login_strategy, (err, result, info) => {
            if (result) {
                /*res.status(info.statusCode).send({
                    _access_token: result
                })*/

                /**
                 * Send the random generated code to the user
                 */
                 /**
                 * Generate a random bytes
                 */
                var buffer = crypto.randomBytes(3) //, function(err, buffer) {
                var code = parseInt(buffer.toString('hex'),16).toString().substr(0,9);
                
                CodeService.RemoveCode(result.id).then(d => {

                    CodeService.AddCode(code,result.id).then(h => {

                        // send the email
                        const mailOptions = {
                            from: 'sender@email.com', // sender address
                            to: result.email, // list of receivers
                            subject: 'Verification Code: DO NOT REPLY', // Subject line
                            html: '<p>Here is your verification code: <h3>' + code + '</h3> </p>'// plain text body
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            //if(err)
                              //console.log(err)
                            //else
                              //console.log(info);
                         });


                        res.send(result.id)
                    }).catch(err => {
                        res.status(500).end()
                    })
                    
                }).catch(err => {
                    console.log(err)
                    res.status(500).end()
                })

            } else if (info) {

                res.status(info.statusCode)
                res.send(info.message)
            } else {

                res.send(err)
            }
        })(req, res)
}

/**
 * Get all the users
 */
exports.Users = (req, res) => {
    var page = req.query.page
    var amount = req.query.amount
    console.log(page)

    UserService.GetUsers(parseInt(page), parseInt(amount)).then(result => {
        if (result) {
            
            res.send(result)
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })

}


