const express = require('express')
const router = express.Router()

router.get('/playlists')
router.post('/playlists')

router.get('/playlists/:playlist_uid')
router.patch('/playlists/:playlist_uid')
router.delete('/playlists/:playlist_uid')

router.post('/playlists/:playlist_uid/item')
router.delete('/playlists/:playlist_uid/item/:item_playlist_id')

module.exports = router
