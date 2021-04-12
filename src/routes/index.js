const express = require('express')
const router = express.Router()

const rest = require('./rest')
const search = require('./search')

router.use(rest)
router.use(search)

module.exports = router
