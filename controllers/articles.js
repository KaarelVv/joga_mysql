
class ArticlesController extends BaseController {
    constructor(articleModel) {
        super()
        this.articleModel = articleModel
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.articleModel.findAll()
            res.render('index', { articles })
        } catch (error) {
            this.handleError(res, error, 'Failed to fetch articles', 500)
        }
    }

    async getArticleBySlug(req, res) {
        const article = await this.articleModel.findOne(req.params.slug)
        res.status(200).render('article', { article })
    }


    async createNewArticle(req, res) {
        try {
            const newArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image || 'https://via.placeholder.com/150',
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            }
            const articleId = await this.articleModel.create(newArticle)

            res.status(201).json({
                message: `Article created successfully with ID: ${articleId}`,
                article: { id: articleId, ...newArticle },
                redirect: `/index`
            })
        } catch (error) {
            this.handleError(res, error, 'Failed to create article', 500)
        }
    }
}

module.exports = ArticlesController
const BaseController = require('./base')
