'use strict'

const router = require('express').Router()
const AccountController = require('./account_controller')
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler
const Authorize = require('../middleware/authorization/authorize').Authorize

router.post('/login', AccountController.Login)
router.post('/register', Authorize({Roles: 'admin'}), AccountController.RegisterUser, MongoErrorHandler)

module.exports = router