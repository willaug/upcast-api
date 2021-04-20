const { check } = require('express-validator')

module.exports = [
  check('title')
    .isLength({ min: 3 }).withMessage('Adicione um título de, pelo menos, 3 caracteres')
    .not().isByteLength(45).withMessage('O título não deve exceder 45 caracteres'),

  check('category')
    .isInt({ min: 1 }).withMessage('É necessário adicionar uma categoria válida')
]
