const express = require('express')
const router = express.Router()

const User = require('../../controllers/UserController')

router.get('/users', User.index)
router.post('/users', User.create)

router.get('/users/:userUid', User.findByUid)

router.get('/users/account', User.findSettingsByToken)
router.patch('/users/account')
router.delete('/users/account')

// playlists
router.get('/users/:userUid/playlists')

// follow
router.post('/users/:userUid/follow')
router.delete('/users/:userUid/follow')

module.exports = router
