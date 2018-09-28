const UserModel = require('../model/user_model')

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
        username: username,
        password: password,
        _role: role,
        email: email
    })  

    return newUser.save()


}