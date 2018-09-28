const mongoose = require('mongoose')

/**
 * Hymn schema that represent the hymn
 */
var hymn_schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
   _created_at: { type: Date, default: new Date()},
   _updated_at: Date,
    verse: { type: String, text: true, required: [true, 'Song verses is required']},
    hymn_number: { type: Number, required: true }
})

module.exports = mongoose.model('hymn', hymn_schema)