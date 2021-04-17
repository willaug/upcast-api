const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

class AccountController {
  async index (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]

    const decoded = jwt.decode(token)

    try {
      const userFound = await User.findByPk(decoded.uid,
        { attributes: ['uid', 'username', 'url_photo', 'email', 'createdAt', 'updatedAt'] })

      return res.status(200).json(userFound)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async update (req, res) {
    const { filename } = res.locals
    const { action, username, email, newPassword, currentPassword } = req.body
    const URL = '/images/users/'

    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    const decoded = jwt.decode(token)
    const userUid = decoded.uid

    try {
      const userFound = await User.findByPk(userUid)

      if (filename) {
        await User.update({ url_photo: URL + filename }, { where: { uid: userUid } })

        if (userFound.url_photo === `${URL}default.svg`) {
          return res.status(200).json('Imagem adicionada com sucesso')
        }

        const currentPhotoURL = `./public${userFound.url_photo}`
        await fs.unlinkSync(currentPhotoURL)

        return res.status(200).json('Imagem alterada com sucesso')
      } else if (action) {
        await User.update({ url_photo: URL + 'default.svg' }, { where: { uid: userUid } })

        const currentPhotoURL = `./public${userFound.url_photo}`
        await fs.unlinkSync(currentPhotoURL)

        return res.status(200).json('Imagem removida com sucesso')
      } else {
        if (username !== undefined) {
          await User.update({ username }, { where: { uid: userUid } })
        }

        if (email !== undefined) {
          await User.update({ email }, { where: { uid: userUid } })
        }

        if (newPassword !== undefined && currentPassword !== undefined) {
          const comparison = await bcrypt.compare(currentPassword, userFound.password)
          const invalidComparison = !comparison

          if (invalidComparison) {
            return res.status(406).json('A senha atual informada está incorreta')
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10)
          await User.update({ password: hashedPassword }, { where: { uid: userUid } })
        }

        return res.status(200).json('Alterações concluídas com sucesso')
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new AccountController()
