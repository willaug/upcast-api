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
      'audio/*'
    ]

    const invalidAudio = !allowedMimes.includes(file.mimetype)

    if (invalidAudio) {
      const error = {
        code: 415,
        message: 'Apenas áudios são suportados.'
      }

      cb(error, false)
    } else {
      cb(null, true)
    }
  }
}
