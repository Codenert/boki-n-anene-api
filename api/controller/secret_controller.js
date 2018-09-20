const app_crypto = require('../middleware/app-crypto')

exports.get_secret = (req, res) => {
    var secret = app_crypto.get_secret()

    res.send( {
        secret: secret
    })

}