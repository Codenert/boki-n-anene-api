'use strict'


const router = require('express').Router()
const AccountController = require('./account_controller')
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler
const Authorize = require('../middleware/authorization/authorize').Authorize

/**
 * A routing middleware for account endpoint
 * @author Kateti Mareko
 * @since 27-08-18
 */

 /**
  * POST
  * Login enpoints
  */
router.post('/login', AccountController.Login)

/**
 * POST
 * Adding a new user endpoint
 * This endpoint is restricted i.e. only the admin user can perform this operation
 */
router.post('/register', Authorize({Roles: 'admin'}), AccountController.RegisterUser, MongoErrorHandler)

module.exports = router