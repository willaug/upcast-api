const bcrypt = require('bcrypt')
const nanoid = NanoIDLength => require('../config/configNanoid')(NanoIDLength)

const User = require('../models/User')

class UserController {
  async index (req, res) {
    try {
      const users = await User.findAll({
        attributes: ['uid', 'username', 'url_photo']
      })

      return res.status(200).json(users)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { username, password, email } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const uid = await nanoid(20)()

    try {
      const [newUser, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          uid,
          username,
          email,
          password: hashedPassword
        }
      })

      const emailExists = !created

      if (emailExists) {
        return res.status(406).json('E-mail já existente!')
      }

      return res.status(201).json(`Seja bem-vindo(a) ${newUser.username}`)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new UserController()
