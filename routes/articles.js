const express = require('express')
const { requireAuth } = require('../utils/auth')

class ArticlesRoutes {
    constructor(articlesController) {
        this.router = express.Router()
        this.articlesController = articlesController
        this.registerRoutes()
      this.requireAuth = requireAuth
    }

    registerRoutes() {
        this.router.get('/', (req, res) => {
            if (req.session && req.session.user) {
                return res.redirect('/articles')
            }
            res.redirect('/login')
        })

        this.router.get('/articles', requireAuth, this.articlesController.getAllArticles.bind(this.articlesController))

        this.router.get('/article/create', requireAuth, (req, res) => {
            res.render('articles/create')
        })
        this.router.get('/articles/manage', requireAuth, async (req, res) => {
            const articles = await this.articlesController.articleModel.findAll()
            res.render('articles/articleTable', { articles })
        })

        this.router.get('/article/:slug/edit', requireAuth, async (req, res) => {
            const article = await this.articlesController.articleModel.findOne(req.params.slug)
            if (!article) {
                return res.status(404).render('404')
            }
            res.render('articles/edit', { article })
        })

        this.router.get('/article/:slug', requireAuth, this.articlesController.getArticleBySlug.bind(this.articlesController))

        this.router.post('/article/create', requireAuth, this.articlesController.createNewArticle.bind(this.articlesController))

        this.router.put('/article/:slug/edit', requireAuth, this.articlesController.updateArticle.bind(this.articlesController))

        this.router.delete('/article/:slug/delete', requireAuth, this.articlesController.deleteArticle.bind(this.articlesController))
    }
}

module.exports = ArticlesRoutes
