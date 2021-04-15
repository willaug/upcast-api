const express = require('express')
const router = express.Router()

// const User = require('../controllers/UserController')

router.get('/account')
router.patch('/account')
router.delete('/account')

module.exports = router
