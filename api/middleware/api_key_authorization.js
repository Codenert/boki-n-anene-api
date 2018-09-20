module.exports = (req, res, next) => {
    // get the api key
    var api_key = req.headers['app-api-key']
    if (api_key !== process.env.API_KEY) {
        res.status(401).send('Unauthorized')
        return
    }
    next()
}