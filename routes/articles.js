const express = require('express')
const ArticlesController = require('../controllers/articles.js')
const router = express.Router()


const articlesCtrl = new ArticlesController()

router.get('/',(req,res)=> articlesCtrl.getAllArticles(req,res))

module.exports = router