const express = require('express')
const router = express.Router()
const HymnController = require('./hymn_controller')
const Authorize = require('../middleware/authorization/authorize').Authorize
//const api_key_authorizer = require('../../middleware/api_key_authorization')

//router.get("/number", api_key_authorizer, HymnController.FindHymnByNumber)
//router.get("/word", api_key_authorizer, HymnController.FindHymnByWord)

router.post("", Authorize({Roles: "*"}), HymnController.AddHymn)

module.exports = router