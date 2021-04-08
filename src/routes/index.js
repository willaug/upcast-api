const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ welcome: 'Olá, bem vindo(a) a minha API!' })
})

module.exports = router
