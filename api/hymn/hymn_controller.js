'use strict'

const HymnService = require('./hymn_service')
const EncryptData = require('./encrypt_decrypt').EncryptData
const DecryptData = require('./encrypt_decrypt').DecryptData

/**
 * Hymn controller to handle hymn operation such as edit, add, find and delete
 * @author Kateti Mareko
 * @since 27-08-18
 */

/**
 * Find the hymn based on the hymn number given
 */
exports.FindHymnByNumber = (req, res) => {
    var hymnNumber = req.query.hymn_number
    HymnService.FindHymnByNumber(hymnNumber).then(result => {
        if (result) {
            try {
                //result.verse = DecryptData(result.verse, true)
                //var jsonString = JSON.stringify(result)
                //console.log(jsonString)

                /**
                 * Encrypt the data
                 * since result is in json format object hence need to convert first to a string
                 */
                var data = EncryptData(JSON.stringify(result), false)
                res.send(data)
            } catch (exception) {
                res.status(500).send(exception)
            }
        } else {
            res.status(404).send()
        }

    }).catch(err => {

        res.status(500).send()
    })

}

/**
 * Find the song based on the search word
 * @returns A list of song matches search word in the verse
 */
exports.FindHymnByWord = (req, res) => {
    var word = req.query.search_word
    HymnService.FindHymnByWord(word).then(result => {

        // encrypt the result
        var cipherText = EncryptData(result.toString())

        // send the encrypted version
        console.log(cipherText)
        res.send(cipherText)
    }).catch(err => {
        res.send(err)
    })
}

/**
 * Add the hymn
 */
exports.AddHymn = (req, res, next) => {
    // decrypt the data
    /*var decryptedData = ""

    var cipherText = ""
    try {
        decryptedData = JSON.parse(DecryptData(req.body.data,false))
        console.log(decryptedData)
        cipherText = EncryptData(decryptedData.verse, true)
    } catch (exception) {
        console.log(exception)
        res.status(500).send()
        return
    }*/

    
    var verse = req.body.verse
    var hymn_number = req.body.hymn_number
    HymnService.AddHymn(verse, hymn_number).then(result => {
        if (result) {
            res.status(201).send(result)
        }
    }).catch(err => {
        console.log(err)
        err.host = 'hymn'
        next(err)
    })

}

/**
 * Edit hymn
 */
exports.EditHymn = (req, res, next) => {

    // data is encrypted
    //var decryptedData = JSON.parse(DecryptData(req.body.data))

    HymnService.EditHymn(req.body).then(result => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).end()
    })

}

/**
 * Delete hymn
 */
exports.DeleteHymn = (req, res, next) => {
    HymnService.DeleteHymn(req.params.id).then(result => {
        if (result)
            res.send(result)
        else
            res.status(404).send()
    }).catch(err => {
        res.status(500).send(err)
    })
}
