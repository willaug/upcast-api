const { check } = require('express-validator')

module.exports = [
  check('username')
    .isLength({ min: 10 }).withMessage('É necessário possuir um nome de usuário')
    .not().isByteLength(45).withMessage('O nome não deve exceder 45 caracteres'),

  check('email')
    .isEmail().withMessage('É necessário possuir um e-mail válido')
    .not().isByteLength(70).withMessage('O e-mail não deve exceder 70 caracteres'),

  check('password')
    .isLength({ min: 8 }).withMessage('Adicione uma senha de pelo menos 8 caracteres')
    .not().isByteLength(120).withMessage('A senha não deve exceder 120 caracteres')
]
