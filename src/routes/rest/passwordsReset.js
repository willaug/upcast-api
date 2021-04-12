const express = require('express')
const router = express.Router()

router.post('/password-reset')

router.get('/password-reset/:passwordReset_uid')
router.patch('/password-reset/:passwordReset_uid')

module.exports = router
