const passport = require('passport')

/**
 * This is a authorization middleware that is dealing with authorizing the user before
 * the user is allowed to perform actions on the controllers.
 * @author Kateti Mareko
 * @since 28/9/2018
 */

 /**
  * Authorize options such as roles
  */
const AuthorizeOptions = {
    Roles: String
}

/**
 * This check if the user with certain role is allowed to perform the action. 
 * This role is passed in as an argument and then compare with the role in the 
 * token payload. if they are the same then further action is allowed to be executed
 * otherwise unauthorized
 * @param {} role 
 */
exports.Authorize = (AuthorizeOptions) => {
    return (req, res, next) => {
        passport.authenticate('bearer', (err, result, info) => {
            if (result) {

                if (result.role === AuthorizeOptions.Roles || AuthorizeOptions.Roles === "*") {
                    next() // When the user is allowed to continue what they requesting to do
                } else {
                    res.status(403).send()
                }
            }

            if (err) {
                res.status(401).end()
            }

        })(req, res, next)
    }
}

