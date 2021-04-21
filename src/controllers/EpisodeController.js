const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const fs = require('fs')

const Episode = require('../models/Episode')
const Show = require('../models/Show')

class EpisodeController {
  async index (req, res) {
    try {
      const episodes = await Episode.findAll({
        attributes: ['uid', 'title', 'duration'],
        include: { association: 'show', attributes: ['uid', 'title'] }
      })

      return res.status(200).json(episodes)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { userUid } = res.locals
    const { show, title, description } = req.body

    try {
      const showFound = await Show.findByPk(show)

      if (showFound === undefined || showFound === null) {
        return res.status(400).json('O programa que você adicionou não existe.')
      } else if (showFound.user_uid !== userUid) {
        return res.status(403).json('Você não tem permissão para adicionar um episódio nesse programa.')
      } else {
        const uid = await nanoid(20)()

        await Episode.create({
          uid,
          show_uid: show,
          title,
          description
        })

        return res.status(201).json('Episódio criado.')
      }
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
        const episode = await Episode.findByPk(uid, {
          attributes: ['uid', 'title', 'description', 'url_audio', 'duration', 'createdAt'],
          include: { association: 'show', attributes: ['uid', 'title', 'url_photo'] }
        })

        if (episode === undefined || episode === null) {
          return res.status(404).json('Episódio não encontrado.')
        } else {
          return res.status(200).json(episode)
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async update (req, res) {
    const { uid } = req.params
    const { title, description, show } = req.body
    const { audio, duration } = res.locals

    const audioURL = '/audios/'

    try {
      const episode = await Episode.findByPk(uid)

      if (audio) {
        if (episode.url_audio !== null) {
          await fs.unlinkSync(`./public${episode.url_audio}`)
        }

        await Episode.update({ url_audio: audioURL + audio, duration }, { where: { uid } })

        return res.status(200).json('Aúdio adicionado com sucesso.')
      } else {
        if (description !== undefined) {
          if (description === '') {
            await Episode.update({ description: null }, { where: { uid } })
          } else {
            await Episode.update({ description }, { where: { uid } })
          }
        }

        if (title !== undefined) {
          await Episode.update({ title }, { where: { uid } })
        }

        if (show !== undefined) {
          const showFound = await Show.findByPk(show)

          if (showFound === undefined || showFound === null) {
            return res.status(400).json('O programa mencionado não existe.')
          } else {
            await Episode.update({ show_uid: show }, { where: { uid } })
          }
        }

        return res.status(200).json('Alterações concluídas.')
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async delete (req, res) {
    const { uid } = req.params

    try {
      const episode = await Episode.findByPk(uid)

      if (episode.url_audio !== null) {
        await fs.unlinkSync(`./public${episode.url_audio}`)
      }

      await Episode.destroy({ where: { uid } })

      return res.status(200).json('Episódio removido.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new EpisodeController()
