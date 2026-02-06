const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
    constructor(connection) {
        super('author', connection)
    }

    async findById(id) {
        const author = await super.findById(id)
        return author
    }
    async findOne(name) {
        const author = await super.findOne('name', name)
        return author
    }
    async findMany(name) {
        const authors = await super.findMany('name', name)
        return authors
    }
}

module.exports = AuthorModel
