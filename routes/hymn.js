const express = require('express')
const router = express.Router()
const hymn_controller = require('../api/controller/hymn_controller')
const api_key_authorizer = require('../middleware/api_key_authorization')

router.get("/number", api_key_authorizer, hymn_controller.find_hymn_by_number)
router.get("/word", api_key_authorizer, hymn_controller.find_hymn_by_word)

module.exports = router