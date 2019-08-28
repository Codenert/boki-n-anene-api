const mongoose = require('mongoose')

/**
 * Hymn schema that represent the hymn
 * @author Kateti Mareko
 * @since 27-08-18
 */
var HymnSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
   _created_at: { type: Date, default: new Date()},
   _updated_at: Date,
    verse: { type: String, text: true, required: [true, 'Song verses is required']},
    hymn_number: { type: Number, required: [true,'Hymn number is required'], unique: true }
})

module.exports = mongoose.model('hymn', HymnSchema)