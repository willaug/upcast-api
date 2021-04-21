const { check } = require('express-validator')

module.exports = [
  check('show')
    .optional()
    .isLength({ min: 20, max: 20 }).withMessage('É necessário adicionar um programa válido'),

  check('title')
    .optional()
    .isLength({ min: 5 }).withMessage('Adicione um título de, pelo menos, 5 caracteres')
    .not().isByteLength(45).withMessage('O título não deve exceder 45 caracteres'),

  check('action')
    .optional()
    .isIn(['deleteImage']).withMessage('Ação inválida, caso queira deletar imagem, complete-o com < deleteImage >, caso contrário, deixe nulo')
]
