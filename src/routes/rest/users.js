const express = require('express')
const router = express.Router()

const User = require('../../controllers/UserController')

const Validation = require('../../middlewares/Validation')
const UserCreateValidation = require('../../validations/UserCreateValidation')

router.get('/users', User.index)
router.post('/users', [UserCreateValidation, Validation], User.create)

router.get('/users/:uid', User.findByUid)

// shows
router.get('/users/:uid/shows', User.findShows)

// playlists
router.get('/users/:uid/playlists', User.findPlaylists)

module.exports = router
