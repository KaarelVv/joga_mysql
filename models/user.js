const BaseSQLModel = require('./base')

class UserModel extends BaseSQLModel {
    constructor(connection) {
        super('user', connection)
    }

    async findById(id) {
        const user = await super.findById(id)
        return user
    }
    async findByUsername(username) {
        const user = await super.findOne('username', username)
        return user
    }
    async findByEmail(email) {
        const user = await super.findOne('email', email)
        return user
    }
    async create(user) {
        const createdUserId = await super.create(user)
        return createdUserId
    }
    async update(id, updatedFields) {
        const updatedUser = await super.update(id, updatedFields)
        return updatedUser
    }
     async roleCheck(userId) {
        const user = await this.findById(userId)
        return user ? user.role : null
    }
}

module.exports = UserModel
