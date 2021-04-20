const express = require('express')
const router = express.Router()

const User = require('../../controllers/UserController')
const Follow = require('../../controllers/FollowController')

const Validation = require('../../middlewares/Validation')
const UserCreateValidation = require('../../validations/UserCreateValidation')

const Auth = require('../../middlewares/Auth')

router.get('/users', User.index)
router.post('/users', [UserCreateValidation, Validation], User.create)

router.get('/users/:uid', User.findByUid)

// playlists
router.get('/users/:uid/playlists')

// follow
router.use('/users/:uid/follow', Auth)
router.post('/users/:uid/follow', Follow.followUser)
router.delete('/users/:uid/follow', Follow.unfollowUser)

module.exports = router
