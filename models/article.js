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
        const query = `UPDATE ${this.tableName} SET ? WHERE slug = ?`
        const result = await this.executeQuery(query, [updatedFields, slug])
        return result.affectedRows
    }
    async delete(slug) {
        const query = `DELETE FROM ${this.tableName} WHERE slug = ?`
        const result = await this.executeQuery(query, [slug])
        return result.affectedRows
    }
}

module.exports = ArticleModel
