const express = require('express')
const router = express.Router()
const multer = require('multer')

const Account = require('../controllers/AccountController')
const Auth = require('../middlewares/Auth')

const Validation = require('../middlewares/Validation')
const UserUpdateValidation = require('../validations/UserUpdateValidation')
const photoConfig = require('../config/uploads/userPhoto')

router.use('/account', Auth)

router.get('/account', Account.index)
router.patch('/account', [UserUpdateValidation, Validation], multer(photoConfig).single('file'), Account.update)
router.delete('/account')

module.exports = router
