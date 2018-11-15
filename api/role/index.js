const router = require('express').Router()
const RoleController = require('./role_controller')
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler

router.post("", RoleController.AddHymn, MongoErrorHandler)

module.exports = router