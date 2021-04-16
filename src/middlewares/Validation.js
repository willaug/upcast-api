const { validationResult } = require('express-validator')

module.exports = function (req, res, next) {
  const errors = validationResult(req)
  const errorsIsNotEmpty = !errors.isEmpty()
  const errorArray = errors.array()
  const errorList = []

  if (errorsIsNotEmpty) {
    for (let i = 0; i < errorArray.length; i++) {
      errorList.push(errorArray[i].msg)
    }

    return res.status(400).json(errorList)
  }

  next()
}
