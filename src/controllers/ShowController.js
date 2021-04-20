const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const jwt = require('jsonwebtoken')
const fs = require('fs')

const Category = require('../models/Category')
const Show = require('../models/Show')
const Episode = require('../models/Episode')

class ShowController {
  async index (req, res) {
    try {
      const shows = await Show.findAll({
        attributes: ['uid', 'title', 'url_photo'],
        include: [
          { association: 'user', attributes: ['uid', 'username'] },
          { association: 'category', attributes: ['name', 'slug'] }
        ]
      })

      return res.status(200).json(shows)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { title, description, category } = req.body

    try {
      const categories = await Category.findByPk(category)

      if (categories === undefined || categories === null) {
        return res.status(400).json('Categoria inexistente.')
      }

      const { authorization } = req.headers
      const token = authorization && authorization.split(' ')[1]
      const decoded = jwt.decode(token)
      const userUid = decoded.uid

      const uid = await nanoid(20)()

      await Show.create({ uid, user_uid: userUid, category_id: category, title, description })

      return res.status(201).json('Programa criado com sucesso.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async findByUid (req, res) {
    const { uid } = req.params

    if (uid.length !== 20) {
      return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
    } else {
      try {
        const show = await Show.findByPk(uid, {
          attributes: ['uid', 'title', 'url_photo', 'description', 'createdAt'],
          include: [
            { association: 'user', attributes: ['uid', 'username', 'url_photo'] },
            { association: 'category', attributes: ['name', 'slug'] }
          ]
        })

        if (show === undefined || show === null) {
          return res.status(404).json('Programa não encontrado.')
        }

        return res.status(200).json(show)
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async update (req, res) {
    const { filename } = res.locals
    const { uid } = req.params
    const { action, title, description, category } = req.body

    const URL = '/images/shows/'

    try {
      const show = await Show.findByPk(uid)

      if (filename) {
        await Show.update({ url_photo: URL + filename }, { where: { uid } })

        if (show.url_photo === `${URL}default.svg`) {
          return res.status(200).json('Imagem adicionada com sucesso')
        }

        const currentPhotoURL = `./public${show.url_photo}`
        await fs.unlinkSync(currentPhotoURL)

        return res.status(200).json('Imagem alterada com sucesso')
      } else if (action) {
        await Show.update({ url_photo: `${URL}default.svg` }, { where: { uid } })

        if (show.url_photo === `${URL}default.svg`) {
          return res.status(406).json('O programa não possui uma imagem definida.')
        }

        const currentPhotoURL = `./public${show.url_photo}`
        await fs.unlinkSync(currentPhotoURL)

        return res.status(200).json('Imagem removida com sucesso')
      } else {
        if (title !== undefined) {
          await Show.update({ title }, { where: { uid } })
        }

        if (category !== undefined) {
          const categories = await Category.findByPk(category)

          if (categories === null || categories === undefined) {
            return res.status(400).json('A categoria escolhida não existe.')
          } else {
            await Show.update({ category_id: category }, { where: { uid } })
          }
        }

        if (description !== undefined) {
          await Show.update({ description }, { where: { uid } })
        }

        return res.status(200).json('Alterações concluídas com sucesso')
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async delete (req, res) {
    const { uid } = req.params

    try {
      const show = await Show.findByPk(uid)

      const showURL = '/images/shows/'
      const episodeURL = '/images/episodes/'

      if (show.url_photo !== `${showURL}default.svg`) {
        await fs.unlinkSync(`./public${show.url_photo}`)
      }

      const episodes = await Episode.findAll({ where: { show_uid: uid } })

      episodes.forEach(async episode => {
        await fs.unlinkSync(`./public${episode.url_audio}`)

        if (episode.url_thumbnail !== `${episodeURL}default.svg`) {
          await fs.unlinkSync(`./public${episode.url_thumbnail}`)
        }
      })

      await Show.destroy({ where: { uid } })

      return res.status(200).json('O programa e seus episódios foram deletados e não poderão ser recuperados.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new ShowController()
