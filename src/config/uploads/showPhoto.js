const path = require('path')
const multer = require('multer')
const nanoid = NanoIDLength => require('../nanoidConfig')(NanoIDLength)

module.exports = {
  dest: path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'shows'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'shows'))
    },
    filename: (req, file, cb) => {
      cb(null, nanoid(20)() + path.extname(file.originalname))
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]

    const invalidImage = !allowedMimes.includes(file.mimetype)

    if (invalidImage) {
      const error = {
        code: 415,
        message: 'Apenas imagens em png, jpeg e jpg são suportadas'
      }

      cb(error, false)
    } else {
      cb(null, true)
    }
  }
}
