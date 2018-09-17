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
exports.find_hymn_by_number = ( number ) => {

    return HymnModel.findOne( { hymn_number: number } ).exec()

}