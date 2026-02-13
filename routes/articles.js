const express = require('express')

class ArticlesRoutes {
    constructor(articlesController) {
        this.router = express.Router()
        this.articlesController = articlesController
        this.registerRoutes()
    }

    requireAuth(req, res, next) {
        if (!req.session || !req.session.user) {
            return res.redirect('/login')
        }
        next()
    }

    registerRoutes() {
        this.router.get('/', (req, res) => {
            if (req.session && req.session.user) {
                return res.redirect('/articles')
            }
            res.redirect('/login')
        })

        this.router.get('/articles', this.requireAuth.bind(this), this.articlesController.getAllArticles.bind(this.articlesController))

        this.router.get('/article/create', this.requireAuth.bind(this), (req, res) => {
            res.render('articles/create')
        })
        this.router.get('/articles/manage', this.requireAuth.bind(this), async (req, res) => {
            const articles = await this.articlesController.articleModel.findAll()
            res.render('articles/articleTable', { articles })
        })

        this.router.get('/article/:slug/edit', this.requireAuth.bind(this), async (req, res) => {
            const article = await this.articlesController.articleModel.findOne(req.params.slug)
            if (!article) {
                return res.status(404).render('404')
            }
            res.render('articles/edit', { article })
        })

        this.router.get('/article/:slug', this.articlesController.getArticleBySlug.bind(this.articlesController))

        this.router.post('/article/create', this.requireAuth.bind(this), this.articlesController.createNewArticle.bind(this.articlesController))

        this.router.put('/article/:slug/edit', this.requireAuth.bind(this), this.articlesController.updateArticle.bind(this.articlesController))

        this.router.delete('/article/:slug/delete', this.requireAuth.bind(this), this.articlesController.deleteArticle.bind(this.articlesController))
    }
}

module.exports = ArticlesRoutes
