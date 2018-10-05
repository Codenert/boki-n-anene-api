const mongoose = require('mongoose')
var HymnModel = require('../model/hymn_model')

/**
 * This is a hymn service that responsible for query data using mongoose
 */

 /**
  * Find the hymn that matches the given hymn number input
  * and return it as a promise
  * @param { The hymn number to be used to find the hymn with that hymn numbner } hymn_number 
  */
exports.FindHymnByNumber = ( number ) => {

    return HymnModel.findOne( { hymn_number: number } ).exec()

}

/**
  * Find the hymn that matches the given hymn number input
  * and return it as a promise
  * @param { The hymn number to be used to find the hymn with that hymn numbner } hymn_number 
  */
 exports.FindHymnByWord = ( word ) => {

    return HymnModel.find( { $text: { $search: "\"" + word + "\"", $caseSensitive: false } } ).sort(
        { hymn_number: "asc" }
    ).exec();

}

exports.AddHymn = (verse, hymn_number) => {

    return new HymnModel({
        _id: new mongoose.Types.ObjectId,
        verse: verse,
        hymn_number: hymn_number,
        _updated_at: new Date()
    }).save()

}