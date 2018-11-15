const mongoose = require('mongoose')

/**
 * Code schema that store the code for login 
 * @author Kateti Mareko
 * @since 27-08-18
 */
var CodeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    created_at: { type: Date, default: new Date()},
    code: { type: Number, text: true, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

module.exports = mongoose.model('code', CodeSchema)