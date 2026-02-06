const express = require('express')
class AuthorRoutes {
    constructor(authorController) {
        this.router = express.Router()
        this.authorController = authorController
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/author/:id', this.authorController.getAuthorById.bind(this.authorController))
    }
}

module.exports = AuthorRoutes
