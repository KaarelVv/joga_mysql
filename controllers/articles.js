
const ArticleModel = require('../models/article.js')
const articleModel = new ArticleModel()

class ArticlesController {
    constructor() {}

    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll()
            res.render('index', { articles })
        } catch (error) {
            res.status(500).send('Failed to fetch articles')
        }
    }
}

module.exports = ArticlesController
