const { Op } = require('sequelize')

const User = require('../models/User')
const Show = require('../models/Show')
const Episode = require('../models/Episode')
const Category = require('../models/Category')
const Playlist = require('../models/Playlist')

class SearchController {
  async index (req, res) {
    const { query } = req.query
    let { type } = req.query

    if (query === undefined || query === null) {
      return res.status(400).json('É necessário digitar algo para buscar.')
    } else {
      if (type === null || type === undefined || type.length === 0) {
        type = 'all'
      }

      let users, categories, shows, episodes, playlists

      try {
        if (type === 'users' || type === 'all') {
          users = await User.findAll({
            where: { username: { [Op.substring]: query } },
            attributes: ['uid', 'url_photo', 'username']
          })
        }

        if (type === 'categories' || type === 'all') {
          categories = await Category.findAll({
            where: { name: { [Op.substring]: query } },
            attributes: ['name', 'slug']
          })
        }

        if (type === 'shows' || type === 'all') {
          shows = await Show.findAll({
            where: { title: { [Op.substring]: query } },
            attributes: ['uid', 'title', 'description', 'url_photo']
          })
        }

        if (type === 'episodes' || type === 'all') {
          episodes = await Episode.findAll({
            where: { title: { [Op.substring]: query } },
            attributes: ['uid', 'title', 'description', 'duration']
          })
        }

        if (type === 'playlists' || type === 'all') {
          playlists = await Playlist.findAll({
            where: { title: { [Op.substring]: query } },
            attributes: ['uid', 'title']
          })
        }

        return res.status(200).json({ users, categories, shows, episodes, playlists })
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }
}

module.exports = new SearchController()
