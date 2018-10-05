
/**
 * Middleware for handling mongo errors. Every request that will likely to throw mongo error will
 * need to add this middleware in the pipeline.
 */
exports.MongoErrorHandler = (err, req, res, next) => {
    console.log('error')
    // find information about the err
    if (err.code === 11000) {         // uniqueness failed error
        var temp = err.errmsg.split(':')
        var property = temp[2].substring(0,temp[2].lastIndexOf('_'))
        var value = temp[4].replace("\"","").replace("\"","").replace("}","").trim()
        if (err.host === 'hymn') {
            res.status(400).send(property + " '" + value + "' is already exist")
        } else {
            res.status(400).send(property + " '" + value + "' is already taken")
        }
    } else {                          // required error
        res.status(400).send("Some of the field are required")
    }

}