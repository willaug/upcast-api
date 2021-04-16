const express = require('express')
const router = express.Router()

const Account = require('../controllers/AccountController')
const Auth = require('../middlewares/Auth')

router.use('/account', Auth)

router.get('/account', Account.index)
router.patch('/account', Account.update)
router.delete('/account')

module.exports = router
