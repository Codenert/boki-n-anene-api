const RoleService = require('./role_service')

exports.AddHymn = (req, res, next) => {

    var roleName = req.body.name

    RoleService.AddRole(roleName).then (result => {
        if (result) {
            res.status(201).send()
        }
    }).catch(err => {
        next(err)
    })
}