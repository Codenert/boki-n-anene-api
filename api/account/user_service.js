const UserModel = require('../model/user_model')
const mongoose = require('mongoose')

/**
 * User service that is work directly with mongoose for accessing data from mongoose database
 * @author Kateti Mareko
 * @since 28/9/2018
 */

 /**
  * Find the user in the database
  * @param username - username of the user
  */
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