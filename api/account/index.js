'use strict'

const express = require('express');
const router = express.Router();
const accountController = require('./account_controller');

router.get('/verify', accountController.verifyUser);
router.post('/endSession', accountController.endUserSession);
module.exports = router;