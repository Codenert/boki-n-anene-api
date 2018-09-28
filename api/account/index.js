'use strict'

const router = require('express').Router()
const AccountController = require('./account_controller')
const Authorize = require('../middleware/authorization/authorize').Authorize

router.post('/login', AccountController.Login)
router.post('/register', Authorize({ Roles: 'admin'}), AccountController.RegisterUser)

module.exports = router