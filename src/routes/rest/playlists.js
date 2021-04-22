const express = require('express')
const router = express.Router()

const PlaylistController = require('../../controllers/PlaylistController')

const Auth = require('../../middlewares/Auth')
const Validation = require('../../middlewares/Validation')
const PlaylistValidation = require('../../validations/PlaylistValidation')
const PlaylistCreator = require('../../middlewares/PlaylistCreator')

router.get('/playlists', PlaylistController.index)
router.post('/playlists', Auth, [PlaylistValidation, Validation], PlaylistController.create)

router.get('/playlists/:uid', PlaylistController.findByUid)
router.patch('/playlists/:uid', Auth, PlaylistCreator, [PlaylistValidation, Validation], PlaylistController.update)
router.delete('/playlists/:uid', Auth, PlaylistCreator, PlaylistController.delete)

router.post('/playlists/:uid/item')
router.delete('/playlists/:uid/item/:item_playlist_id')

module.exports = router
