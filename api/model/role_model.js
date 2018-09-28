'use strict'

/**
 * Role model
 */

 const mongoose = require('mongoose')

var Role_Model = new mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
    name: { type: String, required: true },
})

module.exports = mongoose.model('_Role', Role_Model)