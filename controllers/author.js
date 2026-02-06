const BaseController = require('./base')

class AuthorController extends BaseController {
    constructor(authorModel, articleModel) {
        super()
        this.authorModel = authorModel
        this.articleModel = articleModel
    }

    async getAuthorById(req, res) {
        try {
            const author = await this.authorModel.findById(req.params.id)
            const articles = await this.articleModel.findMany(author)
            author['articles'] = articles
            res.status(200).json({ author: author })
        } catch (error) {
            this.handleError(res, error, 'Failed to fetch author', 500)
        }
    }
}

module.exports = AuthorController
