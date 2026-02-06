
const ArticleModel = require('../models/article.js')
const articleModel = new ArticleModel()

class ArticlesController {
    constructor() { }

    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll()
            res.render('index', { articles })
        } catch (error) {
            res.status(500).send('Failed to fetch articles')
        }
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        res.status(200).render('article', { article })
    }


    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image || 'https://via.placeholder.com/150',
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
        const articleId = await articleModel.create(newArticle)
    
        res.status(201).json({
            message: `Article created successfully with ID: ${articleId}`,
            article: { id: articleId, ...newArticle },
            redirect: `/index`
        })
    }
}

module.exports = ArticlesController
