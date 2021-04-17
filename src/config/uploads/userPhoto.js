const path = require('path')
const multer = require('multer')
const nanoid = NanoIDLength => require('../configNanoid')(NanoIDLength)

module.exports = {
  dest: path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'users'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'users'))
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

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Formato de imagem inválido!'))
    }
  }
}
