const { check } = require('express-validator')

module.exports = [
  check('username')
    .optional()
    .isLength({ min: 10 }).withMessage('Redefina um nome de usuário com pelo menos 10 caracteres')
    .not().isByteLength(45).withMessage('O novo nome não deve exceder 45 caracteres'),

  check('email')
    .optional()
    .isEmail().withMessage('Para alterar o email, é necessário o novo ser um e-mail válido')
    .not().isByteLength(70).withMessage('O novo e-mail não deve exceder 70 caracteres'),

  check('password')
    .optional()
    .isLength({ min: 8 }).withMessage('A nova senha deve ser de pelo menos 8 caracteres')
    .not().isByteLength(120).withMessage('A nova senha não deve exceder 120 caracteres')
]
