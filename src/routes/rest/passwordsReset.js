const express = require('express')
const router = express.Router()

const PasswordResetController = require('../../controllers/PasswordResetController')

const Validation = require('../../middlewares/Validation')
const PassResetCreateValidation = require('../../validations/PassResetCreateValidation')
const PassResetUpdateValidation = require('../../validations/PassResetUpdateValidation')

router.post('/password-reset', [PassResetCreateValidation, Validation], PasswordResetController.create)
router.get('/password-reset/:uid', PasswordResetController.findByUid)
router.patch('/password-reset/:uid', [PassResetUpdateValidation, Validation], PasswordResetController.addNewPassword)

module.exports = router
