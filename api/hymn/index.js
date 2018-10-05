const express = require('express')
const router = express.Router()
const HymnController = require('./hymn_controller')
const Authorize = require('../middleware/authorization/authorize').Authorize
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler
//const api_key_authorizer = require('../../middleware/api_key_authorization')

//router.get("/number", api_key_authorizer, HymnController.FindHymnByNumber)
//router.get("/word", api_key_authorizer, HymnController.FindHymnByWord)
//router.get("/number", HymnController.FindHymnByNumber)

// This endpoint is authorized by all user
router.post("", Authorize({Roles: "*"}), HymnController.AddHymn, MongoErrorHandler)

module.exports = router