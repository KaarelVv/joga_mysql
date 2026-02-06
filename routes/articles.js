const express = require('express')
const ArticlesController = require('../controllers/articles.js')
const router = express.Router()


const articlesCtrl = new ArticlesController()

router.get('/', (req, res) => articlesCtrl.getAllArticles(req, res))
router.get('/article/create', (req, res) => {
    res.render('create')
})

router.get('/article/:slug', (req, res) => {
    articlesCtrl.getArticleBySlug(req, res)
})

router.post('/article/create', (req, res) => {
    articlesCtrl.createNewArticle(req, res)
})



module.exports = router
