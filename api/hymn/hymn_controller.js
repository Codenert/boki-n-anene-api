
const HymnService = require('./hymn_service')
const Encrypt = require('./encrypt_decrypt').Encrypt
const Decrypt = require('./encrypt_decrypt').Decrypt

exports.FindHymnByNumber = (req, res) => {

    var inputQuery = req.query.hymn_number
    HymnService.FindHymnByNumber(inputQuery).then(result => {

        // decrypt the data
        result.verse = Decrypt(result.verse)

        res.send(result)
    }).catch(err => {
        res.send(err)
    })

}

exports.FindHymnByWord = (req, res) => {
    var word = req.query.search_word
    HymnService.FindHymnByWord(word).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
}

exports.AddHymn = (req, res) => {

    // encrypt data

    HymnService.AddHymn(Encrypt(req.body.verse), req.body.hymn_number).then(result => {
        if (result) {
            res.status(201).send(result)
        }
    }).catch(err => {
        res.status(400).send(err)
    })
}