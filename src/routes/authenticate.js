const express = require('express')
const router = express.Router()

const Authenticate = require('../controllers/AuthenticateController')

router.post('/authenticate', Authenticate.index)

module.exports = router
