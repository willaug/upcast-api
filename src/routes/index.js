const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

// users
router.get('/user', UserController.index)
router.post('/user', UserController.create)

module.exports = router
