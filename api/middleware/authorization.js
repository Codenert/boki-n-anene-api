'use strict'

const AccountService = require('../account/account_service');

exports.verifyUser = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {

        var token = req.headers.authorization.split(" ")[1];

        AccountService.verifyUser(token).then(() => {
            next()
        }).catch(err => {
            switch (err.status) {
                case 403: {
                    res.status(403).send();
                }
                case 401: {
                    res.status(401).send();
                }
            }
        });
    }

    
}