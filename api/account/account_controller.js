'use strict'

const AccountService = require('./account_service');

exports.endUserSession = (req, res, next) => {
    res.clearCookie('bokinanene-pub');
    res.send();
}

exports.verifyUser = (req, res, next) => {

    var tokenToVerify = req.headers.user_auth_token;
    AccountService.verifyUser(tokenToVerify).then (info => {
            res.cookie('bokinanene-pub', new Buffer(process.env.pub,'utf8').toString('base64'), 
                { 
                    domain: 'bokinanene.firebaseapp.com',
                    secure: true,
                    httpOnly: true,
                })
            res.send(info.data);
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