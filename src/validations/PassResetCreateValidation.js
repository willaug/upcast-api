const { check } = require('express-validator')

module.exports = [
  check('email')
    .isEmail().withMessage('É necessário possuir um e-mail válido')
]
