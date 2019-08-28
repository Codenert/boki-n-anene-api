
/**
 * Middleware for handling mongo errors. Every request that will likely to throw mongo error will
 * need to add this middleware in the pipeline.
 * @author Kateti Mareko
 * @since 27-08-18
 */
exports.MongoErrorHandler = (err, req, res, next) => {
    // find information about the err
    if (err.code === 11000) {         // uniqueness failed error
        var temp = err.errmsg.split(':')
        // find the property
        var property = temp[1].substring(temp[1].indexOf('$') + 1, temp[1].lastIndexOf('_'))//temp[2].substring(0,temp[2].lastIndexOf('_'))

        // find the value of the property
        var value = temp[3].replace('}','')//substring(1, temp[2].indexOf('}'))//temp[4].replace("\"","").replace("\"","").replace("}","").trim()

        // if error comes from the hymn
        if (err.host === 'hymn') {
            res.status(400).send(property + " '" + value + "' already exists")
        } else {
            res.status(400).send(property + " '" + value + "' is already taken")
        }
    } else {  
        
       /*var errInArray = JSON.stringify(err.errors).split(':')
        //res.status(400).send((errInArray[3].split(','))[0])
        if (err.name == 'ValidationError') {                 // required error {

        } else if ((errInArray[3].split(','))[0].trim() == "CastError") {
            console.log('dfd')
            res.send(400).send('FDFDFD')
        }*/
        res.status(400).send("Some of the field are required")
    }

}