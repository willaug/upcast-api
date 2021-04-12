const express = require('express')
const router = express.Router()

const rest = require('./rest')
const search = require('./search')
const authenticate = require('./authenticate')

router.use(rest)
router.use(search)
router.use(authenticate)

module.exports = router
