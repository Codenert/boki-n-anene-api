const express = require('express')
const router = express.Router()
const secret_controller = require('../api/controller/secret_controller')

router.get("", secret_controller.get_secret)

module.exports = router