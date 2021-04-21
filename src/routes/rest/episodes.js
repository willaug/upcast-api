const express = require('express')
const router = express.Router()

const Episode = require('../../controllers/EpisodeController')

const Auth = require('../../middlewares/Auth')
const Validation = require('../../middlewares/Validation')
const EpisodeCreateValidation = require('../../validations/EpisodeCreateValidation')

router.get('/episodes', Episode.index)
router.post('/episodes', Auth, [EpisodeCreateValidation, Validation], Episode.create)

router.get('/episodes/:uid', Episode.findByUid)
router.patch('/episodes/:uid', Auth)
router.delete('/episodes/:uid', Auth)

module.exports = router
