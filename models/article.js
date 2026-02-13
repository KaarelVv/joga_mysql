const BaseSQLModel = require('./base')

class ArticleModel extends BaseSQLModel {
    constructor(connection) {
        super('article', connection)
    }

    async findAll() {
        const articles = await super.findAll()
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }

    async findMany(author) {
        const articles = await super.findMany('author_id', author.id)
        return articles
    }

    async create(article) {
        const createdArticleId = await super.create(article)
        return createdArticleId
    }

    async update(slug, updatedFields) {
        const updatedArticle = await super.update('slug', slug, updatedFields)
        return updatedArticle
    }
    async delete(slug) {
        const deletedArticle = await super.delete('slug', slug)
        return deletedArticle
    }
}

module.exports = ArticleModel
