const { check } = require('express-validator')

module.exports = [
  check('password')
    .isLength({ min: 8 }).withMessage('Defina uma nova senha com pelo menos 8 caracteres')
    .not().isByteLength(120).withMessage('O novo nome não deve exceder 120 caracteres'),

  check('confirmPassword')
    .isLength().withMessage('É necessário confirmar a nova senha')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('A confirmação de senha deve ser igual a definição de nova senha')
      }

      return true
    })
]
