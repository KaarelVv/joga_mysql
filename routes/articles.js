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

        this.router.get('/article/:slug', this.articlesController.getArticleBySlug.bind(this.articlesController))

        this.router.post('/article/create', this.articlesController.createNewArticle.bind(this.articlesController))
    }
}

module.exports = ArticlesRoutes
