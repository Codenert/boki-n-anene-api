const mongoose = require('mongoose')

var UserModel = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
    username: { type: String, required: [true, 'Username is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], unique: true },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    _role: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Role is required'] }

})

module.exports = mongoose.model('_User', UserModel)