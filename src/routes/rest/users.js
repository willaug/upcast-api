const express = require('express')
const router = express.Router()

const User = require('../../controllers/UserController')

router.get('/users', User.index)
router.post('/users', User.create)

router.get('/users/:user_uid')
router.patch('/users/:user_uid')
router.delete('/users/:user_uid')

// follow
router.post('/users/:user_uid/follow')
router.delete('/users/:user_uid/follow')

module.exports = router
