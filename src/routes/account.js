const express = require('express')
const router = express.Router()

const Account = require('../controllers/AccountController')
const Auth = require('../middlewares/Auth')

const Validation = require('../middlewares/Validation')
const UserUpdateValidation = require('../validations/UserUpdateValidation')
const sendUserImage = require('../middlewares/uploads/sendUserImage')

router.use('/account', Auth)

router.get('/account', Account.index)
router.patch('/account', [UserUpdateValidation, Validation], sendUserImage, Account.update)
router.delete('/account', Account.delete)

module.exports = router
