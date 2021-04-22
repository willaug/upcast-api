const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const Playlist = require('../models/Playlist')

class PlaylistController {
  async index (req, res) {
    try {
      const playlist = await Playlist.findAll({
        attributes: ['uid', 'title'],
        include: { association: 'author', attributes: ['uid', 'username', 'url_photo'] }
      })

      return res.status(200).json(playlist)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { title } = req.body

    try {
      const { userUid } = res.locals
      const uid = nanoid(20)()

      await Playlist.create({ uid, user_uid: userUid, title })

      return res.status(201).json('Playlist criada.')
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
        const playlist = await Playlist.findByPk(uid, {
          attributes: ['uid', 'title', 'createdAt', 'updatedAt'],
          include: [
            { association: 'author', attributes: ['uid', 'username', 'url_photo'] },
            { association: 'episodes' }
          ]
        })

        if (playlist === undefined || playlist === null) {
          return res.status(404).json('Playlist não encontrada.')
        } else {
          return res.status(200).json(playlist)
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async update (req, res) {
    const { uid } = req.params
    const { title } = req.body

    try {
      await Playlist.update({ title }, { where: { uid } })

      return res.status(200).json('Alteração concluída com sucesso.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async delete (req, res) {
    const { uid } = req.params

    try {
      await Playlist.destroy({ where: { uid } })

      return res.status(200).json('Playlist deletada com sucesso.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new PlaylistController()
