const multer = require('multer')
const photoConfig = require('../../config/uploads/userPhoto')
const upload = multer(photoConfig).single('file')

module.exports = function (req, res, next) {
  upload(req, res, function (err) {
    const { file } = req
    const unsentFile = !file

    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json('Envie uma imagem com até 2 MB')
      } else if (err.code === 415) {
        return res.status(err.code).json(err.message)
      }

      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }

    if (unsentFile) {
      return next()
    }

    res.locals.filename = file.filename
    next()
  })
}
