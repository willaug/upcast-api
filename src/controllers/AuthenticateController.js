const dotEnv = require('dotenv').config()
const dotEnvExpand = require('dotenv-expand')
dotEnvExpand(dotEnv)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

class AccountController {
  async index (req, res) {
    const { email, password } = req.body

    try {
      const userFound = await User.findOne({ where: { email } }, { attributes: ['uid', 'email', 'password'] })

      if (userFound === undefined || userFound === null) {
        return res.status(401).json('Usuário não encontrado. Que tal tentar novamente?')
      }

      const comparison = await bcrypt.compare(password, userFound.password)
      const invalidComparison = !comparison

      if (invalidComparison) {
        return res.status(401).json('Senha inválida')
      }

      const token = await jwt.sign({ uid: userFound.uid },
        process.env.ACCESS_TOKEN, { expiresIn: process.env.EXPIRATION_TOKEN })

      return res.status(200).json(token)
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new AccountController()
