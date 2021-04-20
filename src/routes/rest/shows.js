const express = require('express')
const router = express.Router()

const Show = require('../../controllers/ShowController')

const Validation = require('../../middlewares/Validation')
const ShowCreateValidation = require('../../validations/ShowCreateValidation')
const ShowUpdateValidation = require('../../validations/ShowUpdateValidation')

const Auth = require('../../middlewares/Auth')
const ProgramCreator = require('../../middlewares/ProgramCreator')

router.get('/shows', Show.index)
router.post('/shows', Auth, [ShowCreateValidation, Validation], Show.create)

router.get('/shows/:uid', Show.findByUid)
router.patch('/shows/:uid', Auth, ProgramCreator, [ShowUpdateValidation, Validation], Show.update)
router.delete('/shows/:uid', Auth, ProgramCreator)

// follow
router.post('/shows/:uid/follow')
router.delete('/shows/:uid/follow')

module.exports = router
