const express = require('express')
const router = express.Router()

const PasswordResetController = require('../../controllers/PasswordResetController')

const Validation = require('../../middlewares/Validation')
const PassResetCreateValidation = require('../../validations/PassResetCreateValidation')

router.post('/password-reset', [PassResetCreateValidation, Validation], PasswordResetController.create)
router.patch('/password-reset/:passwordReset_uid')

module.exports = router
