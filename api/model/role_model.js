'use strict'

/**
 * Role model
 * @author Kateti Mareko
 * @since 27-08-18
 */

 const mongoose = require('mongoose')

var Role_Model = new mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: [true, 'Role name is required'] },
})

module.exports = mongoose.model('role', Role_Model)