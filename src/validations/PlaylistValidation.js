const { check } = require('express-validator')

module.exports = [
  check('title')
    .isLength({ min: 3 }).withMessage('Você deve adicionar um título.')
    .not().isByteLength(45).withMessage('O título não deve exceder 45 caracteres')
]
