const express = require('express')
const router = express.Router()

const users = require('./users')
const shows = require('./shows')
const episodes = require('./episodes')
const passwordsReset = require('./passwordsReset')
const playlists = require('./playlists')

router.use(users)
router.use(shows)
router.use(episodes)
router.use(playlists)
router.use(passwordsReset)

module.exports = router
