const UserModel = require('../model/user_model')

exports.find_user = (username) => {
    return UserModel.findOne( { username: username } ).exec()
}