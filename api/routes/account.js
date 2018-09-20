const router = require('express').Router()
const account_controller = require('../controller/account_controller')

// /login
router.post('/login', account_controller.login)

module.exports = router