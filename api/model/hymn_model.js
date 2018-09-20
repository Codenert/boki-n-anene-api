const mongoose = require('mongoose')

/**
 * Hymn schema that represent the hymn
 */
var hymn_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   _created_at: Date,
   _updated_at: Date,
    verse: { type: String, text: true, required: true},
    hymn_number: { type: Number, required: true }
})

module.exports = mongoose.model('hymn', hymn_schema)