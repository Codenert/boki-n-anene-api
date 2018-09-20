const express = require('express')
const router = express.Router()
const hymn_controller = require('../controller/hymn_controller')
const account_controller = require('../controller/account_controller')
const api_key_authorizer = require('../middleware/api_key_authorization')

router.get("/number", api_key_authorizer,hymn_controller.find_hymn_by_number)
router.get("/word", api_key_authorizer, hymn_controller.find_hymn_by_word)

router.post("", account_controller.isSignedIn, (req, res) => {
    res.send("hello world")
})

module.exports = router