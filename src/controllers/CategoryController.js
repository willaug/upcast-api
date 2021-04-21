const Category = require('../models/Category')
const Show = require('../models/Show')

class CategoryController {
  async index (req, res) {
    try {
      const categories = await Category.findAll()

      return res.status(200).json(categories)
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
        return res.status(200).json(category)
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
        include: { association: 'category', where: { slug }, attributes: [] }
      })

      if (shows === undefined || shows === null) {
        return res.status(404).json('Categoria não encontrada.')
      } else {
        return res.status(200).json(shows)
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new CategoryController()
