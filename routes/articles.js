const express = require('express')
const router = express.Router()
const articleController = require('../controller/articles.js')

router.get('/', articleController.getAllArticles)

module.exports = router