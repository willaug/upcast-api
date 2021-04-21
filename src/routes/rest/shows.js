const express = require('express')
const router = express.Router()

const Show = require('../../controllers/ShowController')

const Validation = require('../../middlewares/Validation')
const ShowCreateValidation = require('../../validations/ShowCreateValidation')
const ShowUpdateValidation = require('../../validations/ShowUpdateValidation')

const Auth = require('../../middlewares/Auth')
const sendShowImage = require('../../middlewares/uploads/sendShowImage')
const ProgramCreator = require('../../middlewares/ProgramCreator')

router.get('/shows', Show.index)
router.post('/shows', Auth, [ShowCreateValidation, Validation], Show.create)

router.get('/shows/:uid', Show.findByUid)
router.patch('/shows/:uid', Auth, ProgramCreator, [ShowUpdateValidation, Validation], sendShowImage, Show.update)
router.delete('/shows/:uid', Auth, ProgramCreator, Show.delete)

// follow
router.get('/shows/:uid/followers', Show.followers)
router.get('/shows/:uid/following', Auth, Show.following)

router.use('/shows/:uid/follow', Auth)
router.post('/shows/:uid/follow', Show.follow)
router.delete('/shows/:uid/follow', Show.unfollow)

// episode
router.get('/shows/:uid/episodes')

module.exports = router
