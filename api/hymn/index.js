'use strict'

const express = require('express')
const router = express.Router()
const HymnController = require('./hymn_controller')
const Authorize = require('../middleware/authorization/authorize').Authorize
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler

//router.get("/number", api_key_authorizer, HymnController.FindHymnByNumber)
//router.get("/word", api_key_authorizer, HymnController.FindHymnByWord)

/**
 * Hymn routing endpoints
 * @author Kateti Mareko
 * @since 27-08-18
 */

router.get("/word", HymnController.FindHymnByWord)

/**
 * GET
 * This endpoint requires the user to be an admin
 */
router.get("/number", HymnController.FindHymnByNumber)

/**
 * PUT
 * This is anonymous endpoint i.e. every user in the system can perform this operation
 */
router.put("", Authorize({Roles: "*"}), HymnController.EditHymn)

// This endpoint is authorized by all user
router.post("", Authorize({Roles: "*"}), HymnController.AddHymn, MongoErrorHandler)

/**
 * DELETE
 * Delete the hymn
 */
router.delete("/:id", Authorize({Roles: "admin"}), HymnController.DeleteHymn)

module.exports = router