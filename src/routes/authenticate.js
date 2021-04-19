const express = require('express')
const router = express.Router()

const Authenticate = require('../controllers/AuthenticateController')
const Validation = require('../middlewares/Validation')
const AuthValidation = require('../validations/AuthValidation')

router.post('/authenticate', [AuthValidation, Validation], Authenticate.index)

module.exports = router
