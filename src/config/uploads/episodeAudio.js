const path = require('path')
const multer = require('multer')
const nanoid = NanoIDLength => require('../nanoidConfig')(NanoIDLength)

module.exports = {
  dest: path.resolve(__dirname, '..', '..', '..', 'public', 'audios'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'audios'))
    },
    filename: (req, file, cb) => {
      cb(null, nanoid(20)() + path.extname(file.originalname))
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'audio/mpeg',
      'audio/mp4',
      'audio/ogg',
      'audio/flac',
      'audio/wav'
    ]

    const invalidAudio = !allowedMimes.includes(file.mimetype)

    if (invalidAudio) {
      const error = {
        code: 415,
        message: 'Apenas alguns tipos de aúdio são suportados, são eles: mp3 (mpeg), mp4, ogg, flac e wav'
      }

      cb(error, false)
    } else {
      cb(null, true)
    }
  }
}
