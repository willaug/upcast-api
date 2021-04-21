const moment = require('moment')
require('moment-duration-format')
const { getAudioDurationInSeconds } = require('get-audio-duration')

const audioConfig = require('../../config/uploads/episodeAudio')
const multer = require('multer')
const upload = multer(audioConfig).single('audio')

module.exports = function (req, res, next) {
  upload(req, res, async function (err) {
    const { file } = req
    const unsentAudio = !file

    if (err) {
      if (err.code === 415) {
        return res.status(err.code).json(err.message)
      }

      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    } else if (unsentAudio) {
      next()
    } else {
      const durationInseconds = await getAudioDurationInSeconds(`./public/audios/${file.filename}`)
      const duration = await moment.duration(durationInseconds, 'seconds').format('hh:mm:ss', { trim: false })

      res.locals.audio = file.filename
      res.locals.duration = duration
      next()
    }
  })
}
