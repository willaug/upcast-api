const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)

const Episode = require('../models/Episode')
const Show = require('../models/Show')

class EpisodeController {
  async index (req, res) {
    try {
      const episodes = await Episode.findAll({
        attributes: ['uid', 'title', 'url_thumbnail', 'duration'],
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
          attributes: ['uid', 'title', 'description', 'url_thumbnail', 'url_audio', 'duration', 'createdAt'],
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
}

module.exports = new EpisodeController()
