const RoleModel = require('../model/role_model');
const mongoose = require('mongoose')

/**
 * Role service that manage the role operation
 * @author Kateti Mareko
 * @since 12/11/18
 */

 /**
  * Add new role
  * @param {role name} roleName 
  */
 function AddRole(roleName) {
    console.log(roleName)
    return new RoleModel({
        _id: new mongoose.Types.ObjectId,
        name: roleName
    }).save()

 }

 /**
  * Remove a new role
  * @param { role id of the role to be removed } roleId 
  */
 function RemoveRole(roleId) {
     return RoleModel.findByIdAndRemove({_id: roleId}).exec()
 }

 module.exports = {
     AddRole,
     RemoveRole
 }