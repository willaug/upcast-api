const express = require('express')
const router = express.Router()

const Episode = require('../../controllers/EpisodeController')

const Auth = require('../../middlewares/Auth')
const EpisodeCreator = require('../../middlewares/EpisodeCreator')
const Validation = require('../../middlewares/Validation')
const EpisodeCreateValidation = require('../../validations/EpisodeCreateValidation')
const EpisodeUpdateValidation = require('../../validations/EpisodeUpdateValidation')
const sendEpisodeAudio = require('../../middlewares/uploads/sendEpisodeAudio')

router.get('/episodes', Episode.index)
router.post('/episodes', Auth, [EpisodeCreateValidation, Validation], Episode.create)

router.get('/episodes/:uid', Episode.findByUid)
router.patch('/episodes/:uid',
  Auth, EpisodeCreator, [EpisodeUpdateValidation, Validation], sendEpisodeAudio, Episode.update)

router.delete('/episodes/:uid', Auth)

module.exports = router
