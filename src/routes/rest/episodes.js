const express = require('express')
const router = express.Router()

router.get('/episodes')
router.post('/episodes')

router.get('/episodes/:episode_uid')
router.patch('/episodes/:episode_uid')
router.delete('/episodes/:episode_uid')

module.exports = router
