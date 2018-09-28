const mongoose = require('mongoose')

var UserModel = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    _role: { type: mongoose.Schema.Types.ObjectId } 

})

module.exports = mongoose.model('_User', UserModel)