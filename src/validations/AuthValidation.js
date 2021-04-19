const { check } = require('express-validator')

module.exports = [
  check('email')
    .isEmail().withMessage('É necessário inserir um e-mail válido'),

  check('password')
    .isLength({ min: 8 }).withMessage('É necessário inserir uma senha de pelo menos 8 caracteres')
]
