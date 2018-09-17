
const hymn_service = require('../service/hymn_service')

exports.find_hymn_by_number = (req, res) => {

    var inputQuery = req.query.hymn_number
    hymn_service.find_hymn_by_number(inputQuery).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })

}