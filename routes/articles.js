const express = require('express')

class ArticlesRoutes {
    constructor(articlesController) {
        this.router = express.Router()
        this.articlesController = articlesController
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/', this.articlesController.getAllArticles.bind(this.articlesController))
        this.router.get('/article/create', (req, res) => {
            res.render('create')
        })
        this.router.get('/articles', async (req, res) => {
            const articles = await this.articlesController.articleModel.findAll()
            res.render('articleTable', { articles })
        })

        this.router.get('/article/:slug/edit', async (req, res) => {
            const article = await this.articlesController.articleModel.findOne(req.params.slug)
            if (!article) {
                return res.status(404).render('404')
            }
            res.render('edit', { article })
        })

        this.router.get('/article/:slug', this.articlesController.getArticleBySlug.bind(this.articlesController))

        this.router.post('/article/create', this.articlesController.createNewArticle.bind(this.articlesController))

        this.router.put('/article/:slug/edit', this.articlesController.updateArticle.bind(this.articlesController))

        this.router.delete('/article/:slug/delete', this.articlesController.deleteArticle.bind(this.articlesController))
    }
}

module.exports = ArticlesRoutes
