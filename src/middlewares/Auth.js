require('dotenv').config()

const User = require('../models/User')

const jwt = require('jsonwebtoken')
const secret = process.env.ACCESS_TOKEN

module.exports = function (req, res, next) {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]
  const decoded = jwt.decode(token)

  if (token === undefined || token === null) {
    return res.status(401).json('É necessário estar autenticado para continuar.')
  }

  jwt.verify(token, secret, async (err, response) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json('Sua autorização expirou, autentique-se novamente.')
      }

      return res.status(403).json('Sua autorização é inválida, autentique-se.')
    }

    try {
      const userUid = await User.findByPk(decoded.uid, { attributes: ['uid'] })

      if (userUid === undefined || userUid === null) {
        return res.status(403).json('Sua autorização não pertence a nenhum usuário, autentique-se novamente.')
      }

      next()
    } catch {
      return res.status(500).json('Ocorreu um erro na verificação de token. Tente novamente mais tarde.')
    }
  })
}
