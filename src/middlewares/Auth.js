require('dotenv').config()

const jwt = require('jsonwebtoken')
const secret = process.env.ACCESS_TOKEN

module.exports = function (req, res, next) {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (token === undefined || token === null) {
    return res.status(401).json('É necessário estar autenticado para continuar.')
  }

  jwt.verify(token, secret, (err, response) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json('Sua autorização expirou, autentique-se novamente.')
      }

      return res.status(403).json('Sua autorização é inválida, autentique-se.')
    }

    next()
  })
}
