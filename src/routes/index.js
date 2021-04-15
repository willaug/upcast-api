const express = require('express')
const router = express.Router()

const rest = require('./rest')
const search = require('./search')
const account = require('./account')
const authenticate = require('./authenticate')

router.use(rest)
router.use(search)
router.use(account)
router.use(authenticate)

module.exports = router
