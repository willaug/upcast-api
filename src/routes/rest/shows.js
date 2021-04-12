const express = require('express')
const router = express.Router()

router.get('/shows')
router.post('/shows')

router.get('/shows/:show_uid')
router.patch('/shows/:show_uid')
router.delete('/shows/:show_uid')

// follow
router.post('/shows/:show_uid/follow')
router.delete('/shows/:show_uid/follow')

module.exports = router
