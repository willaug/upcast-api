const { check } = require('express-validator')

module.exports = [
  check('show')
    .isLength({ min: 20, max: 20 }).withMessage('É necessário adicionar um programa válido'),

  check('title')
    .isLength({ min: 5 }).withMessage('Adicione um título de, pelo menos, 5 caracteres')
    .not().isByteLength(45).withMessage('O título não deve exceder 45 caracteres')
]
