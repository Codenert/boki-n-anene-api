'use strict'

const express = require('express');
const router = express.Router();
const HymnController = require('./hymn_controller');
const Authorization = require('../middleware/authorization');
const MongoErrorHandler = require('../error/mongo_error').MongoErrorHandler

/**
 * Hymn routing endpoints
 * @author Kateti Mareko
 * @since 27-08-18
 */

router.get("/word", Authorization.verifyUser, HymnController.FindHymnByWord)

router.get("/number", Authorization.verifyUser, HymnController.FindHymnByNumber)

/**
 * PUT
 * This is anonymous endpoint i.e. every user in the system can perform this operation
 */
router.post("", (req, res, next) => {
    req.requiredPrivilege = true;
    next();
}, Authorization.verifyUser, HymnController.AddHymn, MongoErrorHandler)

/**
 * PUT
 * This is anonymous endpoint i.e. every user in the system can perform this operation
 */
router.put("", (req, res, next) => {
    req.requiredPrivilege = true;
    next();
}, Authorization.verifyUser, HymnController.EditHymn)

/**
 * DELETE
 * Delete the hymn
 */
router.delete("/:id", (req, res, next) => {
    req.requireAdmin = true;
    next();
}, Authorization.verifyUser, HymnController.DeleteHymn)

module.exports = router