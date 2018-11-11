
/**
 * Middleware for handling mongo errors. Every request that will likely to throw mongo error will
 * need to add this middleware in the pipeline.
 * @author Kateti Mareko
 * @since 27-08-18
 */
exports.MongoErrorHandler = (err, req, res, next) => {
    console.log('error')
    // find information about the err
    if (err.code === 11000) {         // uniqueness failed error
        var temp = err.errmsg.split(':')

        // find the property
        var property = temp[2].substring(0,temp[2].lastIndexOf('_'))

        // find the value of the property
        var value = temp[4].replace("\"","").replace("\"","").replace("}","").trim()

        // if error comes from the hymn
        if (err.host === 'hymn') {
            res.status(400).send(property + " '" + value + "' is already exist")
        } else {
            res.status(400).send(property + " '" + value + "' is already taken")
        }
    } else {                          // required error
        res.status(400).send("Some of the field are required")
    }

}