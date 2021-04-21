const express = require('express')
const router = express.Router()

const CategoryController = require('../../controllers/CategoryController')

router.get('/categories', CategoryController.index)
router.get('/categories/:slug', CategoryController.findBySlug)
router.get('/categories/:slug/shows', CategoryController.findShows)

module.exports = router
