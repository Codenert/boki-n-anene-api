'use strict'

const HymnService = require('../hymn_service')

    
/**
 * Find the hymn based on the hymn number given
 */
exports.FindHymnByNumber = (req, res) => {
    var hymnNumber = req.query.hymn_number

    HymnService.FindHymnByNumber(hymnNumber).then(result => {
        if (result) {
            res.send(result)
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
        res.send(result)
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