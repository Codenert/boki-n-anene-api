'use strict'

const mongoose = require('mongoose')
var HymnModel = require('../model/hymn_model')

/**
 * Hymn service that responsible for query data using mongoose
 * for anything to do with the hymn
 * @author Kateti Mareko
 * @since 27-08-18
 */

 /**
  * Find the hymn that matches the given hymn number input
  * and return it as a promise
  * @param { The hymn number of the song } hymn_number 
  */
function FindHymnByNumber( number ) {
    return HymnModel.findOne( { hymn_number: number } ).exec()
}

/**
  * Find the hymn that matches the search word
  * @param { word to search for in all the verses of the song } word 
  * @returns promise object
  */
function FindHymnByWord( word ) {
    return HymnModel.find( { $text: { $search: "\"" + word + "\"", $caseSensitive: false } } ).sort(
        { hymn_number: "asc" }
    ).exec();

}

/**
 * Get hymns with limit amount depend of the value of amount parameter
 * @param { page number } page 
 * @param { amount of data to return } amount 
 */
function GetHymns( page, amount ) {
    return HymnModel.find().sort({hymn_number: 'asc'}).skip(page*amount - amount).limit(amount).exec()
}

function GetHymn(id) {
    return HymnModel.findById(id).exec()
}

function GetNumberOfHymns() {
    return HymnModel.count().exec()
}

/**
 * Add new song
 * @param { verse of the song } verse 
 * @param {hymn number of song } hymn_number 
 * @returns promise
 */
function AddHymn(verse, hymn_number) {
    return new HymnModel({
        _id: new mongoose.Types.ObjectId,
        verse: verse,
        hymn_number: hymn_number,
        _updated_at: new Date()
    }).save()
}

/**
 * Update hymn
 * @param {hymn to be updated} hymn 
 */
function EditHymn(hymn) {
    hymn._updated_at = new Date()   // change the update at property value to the date when the modification happen
    return HymnModel.findOneAndUpdate({
        hymn_number: hymn.hymn_number
    }, hymn, {
        new: true
    }).exec();
    /*return HymnModel.findByIdAndUpdate(hymn._id, hymn, {
        new: true   // additional option 
    }).exec()*/
}

/**
 * Delete a specific hymn from the database
 * @param { Id of the song to be deleted } id 
 */
function DeleteHymn(id) {
    return HymnModel.findOneAndRemove({hymn_number:id}).exec()
}

module.exports = {
    GetHymns,
    GetHymn,
    GetNumberOfHymns,
    FindHymnByNumber,
    FindHymnByWord,
    AddHymn,
    EditHymn,
    DeleteHymn
}