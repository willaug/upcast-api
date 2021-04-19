const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Show = require('../models/Show')
const Episode = require('../models/Episode')

class AccountController {
  async index (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]

    const decoded = jwt.decode(token)

    try {
      const user = await User.findByPk(decoded.uid,
        { attributes: ['uid', 'username', 'url_photo', 'email', 'createdAt', 'updatedAt'] })

      return res.status(200).json(user)
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
      const user = await User.findByPk(userUid)

      if (filename) {
        await User.update({ url_photo: URL + filename }, { where: { uid: userUid } })

        if (user.url_photo === `${URL}default.svg`) {
          return res.status(200).json('Imagem adicionada com sucesso')
        }

        const currentPhotoURL = `./public${user.url_photo}`
        await fs.unlinkSync(currentPhotoURL)

        return res.status(200).json('Imagem alterada com sucesso')
      } else if (action) {
        await User.update({ url_photo: URL + 'default.svg' }, { where: { uid: userUid } })

        const currentPhotoURL = `./public${user.url_photo}`
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
          const comparison = await bcrypt.compare(currentPassword, user.password)
          const invalidComparison = !comparison

          if (invalidComparison) {
            return res.status(401).json('A senha atual informada está incorreta')
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

  async delete (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    const decoded = jwt.decode(token)
    const userUid = decoded.uid

    const userURL = '/images/users/'
    const showURL = '/images/shows/'
    const episodeURL = '/images/episodes/'

    try {
      const user = await User.findByPk(userUid)
      const userShows = await Show.findAll({ attributes: ['uid', 'url_photo'] }, { where: { user_uid: userUid } })

      userShows.forEach(async show => {
        if (show.url_photo !== `${showURL}default.svg`) {
          await fs.unlinkSync(`./public${show.url_photo}`)
        }

        const showEpisodes = await Episode.findAll({ attributes: ['uid', 'url_thumbnail', 'url_audio'] }, { where: { show_uid: show.uid } })

        showEpisodes.forEach(async episode => {
          await fs.unlinkSync(`./public${episode.url_audio}`)

          if (episode.url_thumbnail !== `${episodeURL}default.svg`) {
            await fs.unlinkSync(`./public${episode.url_thumbnail}`)
          }
        })
      })

      if (user.url_photo !== `${userURL}default.svg`) {
        await fs.unlinkSync(`./public${user.url_photo}`)
      }

      await User.destroy({ where: { uid: userUid } })

      return res.status(200).json(`Sua conta foi deletada e não poderá ser recuperada. Até breve, ${user.username}!`)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new AccountController()
