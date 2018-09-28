const BearerStrategy = require('passport-http-bearer')
const jsonWebToken = require('jsonwebtoken')

module.exports = Strategy = {
    /**
     * This strategy verify the token, if the token is valid then it will
     * pass back the decoded token else it will throw an error
     */
    BearerdStrategy : new BearerStrategy((token, done) => {
        jsonWebToken.verify(token, process.env.JWT_SECRET, (err, decode) => {
            
            if (token) {
                
                if (err) {
                    return done(err, null)
                }

                if (decode) {
                    return done(null, decode)
                }
            } else {
                return done(null, null, {
                    statusCode: 403
                })
            }
        })
    })
}