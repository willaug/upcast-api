const express = require('express')
const router = express.Router()

router.get('/categories')
router.post('/categories')

router.get('/categories/:category_slug')
router.patch('/categories/:category_slug')
router.delete('/categories/:category_slug')

module.exports = router
