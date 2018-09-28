
const HymnService = require('./hymn_service')

exports.FindHymnByNumber = (req, res) => {

    var inputQuery = req.query.hymn_number
    HymnService.find_hymn_by_number(inputQuery).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })

}

exports.FindHymnByWord = (req, res) => {
    var word = req.query.search_word
    HymnService.find_hymn_by_word(word).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
}