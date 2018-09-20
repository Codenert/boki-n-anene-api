const passport = require('passport')

exports.login = (req, res) => {
        passport.authenticate('local-sigin', (err, result, info) => {
            if (info) {
                res.status(info.statusCode)
                res.send(info.message)
            } else {
                res.send(err)
            }
        })(req, res)
}