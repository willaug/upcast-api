const multer = require('multer')
const audioConfig = require('../../config/uploads/episodeAudio')
const upload = multer(audioConfig).single('audio')

module.exports = function (req, res, next) {
  upload(req, res, function (err) {
    const { file } = req
    const unsentAudio = !file

    if (err) {
      if (err.code === 415) {
        return res.status(err.code).json(err.message)
      } else {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    } else if (unsentAudio) {
      return next()
    } else {
      return res.json('Áudio enviado!')
    }
  })
}
