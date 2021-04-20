const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const jwt = require('jsonwebtoken')

const Category = require('../models/Category')
const Show = require('../models/Show')

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
}

module.exports = new ShowController()
