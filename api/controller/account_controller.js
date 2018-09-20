const passport = require('passport')

exports.login = (req, res) => {
        passport.authenticate('local-sigin', (err, result, info) => {
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

exports.isSignedIn = (req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, result, info) => {
        if (result) {
            next()
        } else if (info) {
            res.status(info.statusCode)
            res.send(info.message)
        } else {
            res.send(err)
        }
    })(req, res, next)
}
