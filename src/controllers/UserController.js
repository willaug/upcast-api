const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const bcrypt = require('bcrypt')

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
    const { password, email } = req.body
    let { username } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const uid = await nanoid(20)()

    username = username.replace(/  +/g, ' ')

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
        return res.status(400).json('E-mail já existente!')
      } else {
        return res.status(201).json(`Seja bem-vindo(a) ${newUser.username}`)
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
        const searchResult = await User.findByPk(uid, { attributes: ['uid', 'username', 'url_photo', 'createdAt'] })

        if (searchResult === undefined || searchResult === null) {
          return res.status(404).json('Usuário não encontrado.')
        }

        return res.status(200).json(searchResult)
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }
}

module.exports = new UserController()
