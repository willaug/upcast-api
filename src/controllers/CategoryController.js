const Category = require('../models/Category')
const Show = require('../models/Show')

class CategoryController {
  async index (req, res) {
    try {
      const categories = await Category.findAll()

      return res.status(200).json({ response: categories })
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async findBySlug (req, res) {
    const { slug } = req.params

    try {
      const category = await Category.findOne({ where: { slug } })

      if (category === undefined || category === null) {
        return res.status(404).json('Categoria não encontrada.')
      } else {
        const host = process.env.HOST
        const _links = [
          {
            href: `${host}/categories`,
            rel: 'get_all_categories',
            method: 'GET'
          },
          {
            href: `${host}/categories/${category.slug}/shows`,
            rel: 'get_category_shows',
            method: 'GET'
          }
        ]

        return res.status(200).json({ response: category, _links })
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async findShows (req, res) {
    const { slug } = req.params

    try {
      const shows = await Show.findAll({
        attributes: ['uid', 'title', 'url_photo'],
        include: [
          { association: 'category', where: { slug }, attributes: [] },
          { association: 'author', attributes: ['uid', 'url_photo', 'username'] }]
      })

      if (shows === undefined || shows === null) {
        return res.status(404).json('Categoria não encontrada.')
      } else {
        const host = process.env.HOST
        const _links = [
          {
            href: `${host}/categories`,
            rel: 'get_all_categories',
            method: 'GET'
          },
          {
            href: `${host}/categories/${slug}`,
            rel: 'get_category',
            method: 'GET'
          }
        ]

        return res.status(200).json({ response: shows, _links })
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new CategoryController()
