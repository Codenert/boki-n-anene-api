'use strict'

const HymnService = require('./hymn_service')
const EncryptData = require('./encrypt_decrypt').EncryptData

/**
 * Hymn controller to handle hymn operation such as edit, add, find and delete
 * @author Kateti Mareko
 * @since 27-08-18
 */
/*
 exports.GetHymn = (req, res) => {
     HymnService.GetHymn(req.query.id).then (result => {
        if (result) {
            res.send(result)
        } else {
           res.status(404).end()    // end the request flow
        }

     }).catch (err => {
         res.send(err)//status(500).end()
     })
 }

exports.GetHymns = (req, res, next ) => {
    var pageNumber = parseInt(req.query.page)
    var amount = req.query.amount

    /*
    * Need to check first if the parameters passed for this endpoint are actually for this endpoints
    * This is because GetHymns and GetHymn both share the same endpoint. The value of paramaters 
    * will determined which one is called
    *
    if (!amount && !pageNumber)
        next() // will eventually call the GetHymn since I call GetHymn straight after GetHymns in my hymn index file

    HymnService.GetNumberOfHymns().then( itemCount => {
        if (itemCount) {
            HymnService.GetHymns(pageNumber, !amount ? 5 : parseInt(amount)).then (result => {
                if (result) {
                    res.send({
                        result: result,
                        amount: itemCount
                    })
                } else {
                    res.status(404).end()
                }
            }).catch( err => {
                res.send(err)
            })
        } else {
            res.send({
                result: [],
                amount: itemCount
            })
        }

    }).catch (err => {
    })

    
}*/

/**
 * Find the hymn based on the hymn number given
 */
exports.FindHymnByNumber = (req, res) => {

    var hymnNumber = req.query.hymn_number
    var api = req.query.api

    HymnService.FindHymnByNumber(hymnNumber).then(result => {
        if (result) {
            try {
                //result.verse = DecryptData(result.verse, true)
                //var jsonString = JSON.stringify(result)

                /**
                 * Encrypt the data
                 * since result is in json format object hence need to convert first to a string
                 */
                var data = EncryptData(JSON.stringify(result), false, api)
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
        var cipherText = EncryptData(JSON.stringify(result))

        // send the encrypted version
        res.send(cipherText)
    }).catch(err => {
        res.send(err)
    })
}

/**
 * Add the hymn
 */
exports.AddHymn = (req, res, next) => {
    
    var verse = req.body.verse
    var hymn_number = req.body.hymn_number

    if (!verse || !hymn_number) {
        res.status(400).send('Hymn number or the song verse required.');
    }

    HymnService.AddHymn(verse, hymn_number).then(result => {
        if (result) {
            res.status(201).send(result)
        }
    }).catch(err => {
        err.host = 'hymn'
        next(err)
    })
}

/**
 * Edit hymn
 */
exports.EditHymn = (req, res, next) => {

    HymnService.EditHymn(req.body).then(result => {
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send();
        }
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