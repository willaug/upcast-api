const multer = require('multer')
const photoConfig = require('../../config/uploads/userPhoto')
const upload = multer(photoConfig).single('file')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

module.exports = function (req, res, next) {
  upload(req, res, async function (err) {
    const { file } = req
    const unsentFile = !file

    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json('Envie uma imagem com até 2 MB')
      } else if (err.code === 415) {
        return res.status(err.code).json(err.message)
      }

      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    } else if (unsentFile) {
      return next()
    } else {
      const originalName = file.filename.split('.')[0]
      const extName = path.extname(file.originalname)
      const newName = `${originalName}-256${extName}`

      const URL = `./public/images/users/${file.filename}`
      const newURL = `./public/images/users/${newName}`

      try {
        await sharp(URL).resize(256, 256, { fit: 'cover' }).toFile(newURL)
        await fs.unlinkSync(URL)

        res.locals.filename = newName
        return next()
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  })
}
