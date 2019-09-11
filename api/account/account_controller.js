'use strict'

const AccountService = require('./account_service');
const crypto = require('crypto');

exports.endUserSession = (req, res, next) => {
    res.clearCookie('bokinanene-pub');
    res.send();
}

exports.verifyUser = (req, res, next) => {

    var tokenToVerify = req.headers.user_auth_token;
    AccountService.verifyUser(tokenToVerify).then (info => {
        // Need to make sure that this request required admin or contributor role
        /*if (req.requiredPrivilege) {
            if (decode.admin || decode.contributor) {
                res.send();
            } else {
                res.status(403).send();
            }
        } else if (req.requireAdmin) {
            if (decode.admin) {
                res.send();
            } else {
                res.status(403).send();
            }
        } else {*/
            res.cookie('bokinanene-pub', new Buffer(process.env.pub,'utf8').toString('base64'), 
                { 
                    domain: 'bokinanene.firebaseapp.com',
                    secure: true,
                    sameSite: 'strict',
                    httpOnly: true,
                })
                res.cookie('sessionId', crypto.randomBytes(32).toString('base64'), 
                { 
                    domain: 'bokinanene.firebaseapp.com',
                    secure: true,
                    httpOnly: true,
                })
            res.send(info.data);
       // }
    }).catch( err => {
        switch (err.status) {
            case 401: {
                res.status(401).send();
            }

            case 500: {
                res.status(500).send();
            }
        }
    })

}