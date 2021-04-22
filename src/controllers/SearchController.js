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

      const allowedTypes = ['users', 'categories', 'shows', 'episodes', 'playlists', 'all']
      const invalidType = !allowedTypes.includes(type)

      if (invalidType) {
        return res.status(400).json('Tipo de busca inválida.')
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

        const host = process.env.HOST
        const _links = [
          {
            href: `${host}/search?query=${query}&type=all`,
            rel: 'search_all',
            method: 'GET'
          },
          {
            href: `${host}/search?query=${query}&type=users`,
            rel: 'search_users',
            method: 'GET'
          },
          {
            href: `${host}/search?query=${query}&type=categories`,
            rel: 'search_categories',
            method: 'GET'
          },
          {
            href: `${host}/search?query=${query}&type=shows`,
            rel: 'search_shows',
            method: 'GET'
          },
          {
            href: `${host}/search?query=${query}&type=episodes`,
            rel: 'search_episodes',
            method: 'GET'
          },
          {
            href: `${host}/search?query=${query}&type=playlists`,
            rel: 'search_playlists',
            method: 'GET'
          }
        ]

        return res.status(200).json({ response: { users, categories, shows, episodes, playlists }, _links })
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }
}

module.exports = new SearchController()
