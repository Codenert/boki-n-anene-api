'use strict'

/**
 * Role model
 * @author Kateti Mareko
 * @since 27-08-18
 */

 const mongoose = require('mongoose')

var Role_Model = new mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
})

module.exports = mongoose.model('Role', Role_Model)