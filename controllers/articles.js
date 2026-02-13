const BaseController = require('./base')

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

    async updateArticle(req, res) {
        try {
            const slug = req.params.slug
            const updatedFields = {
                name: req.body.name,
                image: req.body.image,
                body: req.body.body,
            }
            const updatedArticle = await this.articleModel.update(slug, updatedFields)
            if (!updatedArticle) {
                return res.status(404).json({ message: 'Article not found' })
            }
            res.status(200).json({
                message: 'Article updated successfully',
                article: updatedArticle,
                redirect: `/article/${slug}`
            })
        } catch (error) {
            this.handleError(res, error, 'Failed to update article', 500)
        }
    }

    async deleteArticle(req, res) {
        try {
            const slug = req.params.slug
            const deletedArticle = await this.articleModel.delete(slug)
            if (!deletedArticle) {
                return res.status(404).json({ message: 'Article not found' })       
            }
            res.status(200).json({
                message: 'Article deleted successfully',
                article: deletedArticle,
                redirect: `/index`
            })
        } catch (error) {
            this.handleError(res, error, 'Failed to delete article', 500)
        }
    }
}

module.exports = ArticlesController
