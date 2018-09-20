const passport = require('passport')

exports.login = (req, res) => {
        passport.authenticate('local-sigin', (err, result, msg) => {
            if (result) {
                res.send(result)
            } else if (msg) {
                res.send(msg)
            } else {
                res.send(err)
            }
        })(req, res)
}