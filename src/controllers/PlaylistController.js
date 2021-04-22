const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)

const Playlist = require('../models/Playlist')
const Episode = require('../models/Episode')

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
            {
              association: 'episodes',
              attributes: ['uid', 'title', 'duration', 'description'],
              through: { attributes: ['id'] },
              include: { association: 'show', attributes: ['uid', 'url_photo', 'title'] }
            }
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

  async addItem (req, res) {
    const { episode } = req.body

    if (episode === undefined || episode.length !== 20) {
      return res.status(400).json('É necessário adicionar um episódio válido.')
    } else {
      const { uid } = req.params

      try {
        const episodeFound = await Episode.findByPk(episode, {
          include: { association: 'playlist' }
        })

        const playlistItemsFilter = episode => (episode.uid = uid)
        const playlistItem = episodeFound.playlist.some(playlistItemsFilter)

        if (episodeFound === undefined || episodeFound === null) {
          return res.status(400).json('O episódio que você quer adicionar não existe.')
        } else if (playlistItem) {
          return res.status(406).json('Você já possui este episódio adicionado em sua playlist.')
        } else {
          const playlist = await Playlist.findByPk(uid)
          await episodeFound.addPlaylist(playlist)

          return res.status(201).json('Episódio adicionado na playlist com sucesso.')
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async removeItem (req, res) {
    const { uid, item } = req.params

    const itemId = parseInt(item)

    if (itemId >= 1) {
      try {
        const playlist = await Playlist.findByPk(uid, {
          include: { association: 'episodes', through: { attributes: ['id'], where: { id: itemId } } }
        })

        if (playlist.episodes.length === 0) {
          return res.status(400).json('O item mencionado não existe na playlist.')
        } else {
          const episode = await Episode.findByPk(playlist.episodes[0].uid)
          await episode.removePlaylist(playlist)

          return res.status(200).json('Episódio removido da playlist com sucesso.')
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    } else {
      return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
    }
  }
}

module.exports = new PlaylistController()