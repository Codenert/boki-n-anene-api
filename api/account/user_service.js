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
        role: role,
        email: email
    })  

    return newUser.save()


}

exports.GetUser = (id) => {
    return UserModel.aggregate().//findById(id).populate('role', 'name').exec()
    lookup({
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role_collection'
    }).
    match({
        _id: new mongoose.Types.ObjectId(id)
    }).
    // convert an array to a single object 
    unwind('$role_collection').
    // select only the fields needed
    project({
        _id: '$_id',
        email: '$email',
        username: '$username',
        role: '$role_collection.name'
    }).
    exec()
} 

/**
 * Get all the users in the system
 * @param { next page to load } page
 * @param { amount of user to load at a time } amount
 */
exports.GetUsers = (page, amount) => {
    return UserModel.
            aggregate().
            // Perform a left join of user and roles
            lookup({
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'role_collection'
            }).
            // select the ones with role as a contributor
            match({
                'role_collection.name':'contributor'
            }).
            
            // convert an array to a single object 
            unwind('$role_collection').

            // select only the fields needed
            project({
                _id: '$_id',
                email: '$email',
                username: '$username',
                role: '$role_collection.name'
            }).
            skip(page*amount - amount).
            limit(amount).
            exec()
}