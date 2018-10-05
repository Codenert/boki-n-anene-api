const UserModel = require('../model/user_model')
const mongoose = require('mongoose')

exports.FindUser = (username) => {
    return UserModel.findOne( { username: username } ).exec()
}

/**
 * Create a new user
 * @param {} username 
 * @param {*} password 
 * @param {*} email 
 * @param {*} role 
 */
exports.CreateUser = (username, password, email, role) => {
    var newUser = new UserModel({
        _id: new mongoose.Types.ObjectId,
        username: username,
        password: password,
        _role: role,
        email: email
    })  

    return newUser.save()


}