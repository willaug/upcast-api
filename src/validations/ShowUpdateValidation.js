const { check } = require('express-validator')

module.exports = [
  check('title')
    .optional()
    .isLength({ min: 3 }).withMessage('Ao redefinir um título deve-se ter, pelo menos, 3 caracteres')
    .not().isByteLength(45).withMessage('O novo título não deve exceder 45 caracteres'),

  check('category')
    .optional()
    .isInt({ min: 1 }).withMessage('É necessário redefinir uma categoria válida'),

  check('action')
    .optional()
    .isIn(['deleteImage']).withMessage('Ação inválida, caso queira deletar imagem, complete-o com < deleteImage >, caso contrário, deixe nulo')
]
