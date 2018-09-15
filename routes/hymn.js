const express = require('express')
const router = express.Router()

router.get("/number", (req, res) => {
    res.send("hello from hymn router with parameter: " + req.query.hymn_number)
})

module.exports = router