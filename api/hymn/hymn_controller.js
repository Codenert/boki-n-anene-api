
const HymnService = require('./hymn_service')
const AESEncrypt = require('./encrypt_decrypt').AESEncrypt
const AESDecrypt = require('./encrypt_decrypt').AESDecrypt
const EncryptData = require('./encrypt_decrypt').EncryptData

exports.FindHymnByNumber = (req, res) => {
    var inputQuery = req.query.hymn_number
    HymnService.FindHymnByNumber(inputQuery).then(result => {

        if (result) {
            try {
                result.verse = AESDecrypt(result.verse)
                var data = EncryptData(JSON.stringify(result))
                res.send(data)
            } catch (exception) {
                res.status(500).send()
            }
        } else {
            res.status(404).send()
        }

    }).catch(err => {

        res.status(500).send()
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

exports.AddHymn = (req, res, next) => {

    var cipherText = ""
    try {
        cipherText = AESEncrypt(req.body.verse)
    } catch (exception) {
        res.status(500).send()
        return
    }

    // encrypt data
    HymnService.AddHymn(cipherText, req.body.hymn_number).then(result => {
        if (result) {
            res.status(201).send(result)
        }
    }).catch(err => {
        console.log(err)
        err.host = 'hymn'
        next(err)
    })
}