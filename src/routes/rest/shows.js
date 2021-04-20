const express = require('express')
const router = express.Router()

const Show = require('../../controllers/ShowController')

const Validation = require('../../middlewares/Validation')
const ShowCreateValidation = require('../../validations/ShowCreateValidation')

const Auth = require('../../middlewares/Auth')

router.get('/shows', Show.index)
router.post('/shows', Auth, [ShowCreateValidation, Validation], Show.create)

router.get('/shows/:show_uid')
router.patch('/shows/:show_uid')
router.delete('/shows/:show_uid')

// follow
router.post('/shows/:show_uid/follow')
router.delete('/shows/:show_uid/follow')

module.exports = router
