const jwt = require('jsonwebtoken')
const User = require('../models/User')

class AccountController {
  async index (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]

    const decoded = jwt.decode(token)

    try {
      const userFound = await User.findByPk(decoded.uid,
        { attributes: ['uid', 'username', 'url_photo', 'email', 'createdAt', 'updatedAt'] })

      return res.status(200).json(userFound)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async update (req, res) {
    res.json(req.file)
  }
}

module.exports = new AccountController()
