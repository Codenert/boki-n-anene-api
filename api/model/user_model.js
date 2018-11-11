const mongoose = require('mongoose')

/**
 * User model
 * @author Kateti Mareko
 * @since 27-08-18
 */
var UserModel = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String, required: [true, 'Username is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], unique: true },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    _role: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Role is required'] }

})

module.exports = mongoose.model('User', UserModel)