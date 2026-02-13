const express = require('express')

class UserRoutes {
    constructor(userController) {
        this.router = express.Router()
        this.userController = userController
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/login', (req, res) => {
            if (req.session && req.session.user) {
                return res.redirect('/articles')
            }
            res.render('auth/login')
        })

        this.router.post('/login', this.userController.login.bind(this.userController))

        this.router.get('/register', (req, res) => {
            if (req.session && req.session.user) {
                return res.redirect('/articles')
            }
            res.render('auth/register')
        })

        this.router.post('/register', this.userController.register.bind(this.userController))
        this.router.post('/logout', this.userController.logout.bind(this.userController))

        this.router.get('/users/:id', this.userController.getUserById.bind(this.userController))
        this.router.post('/users', this.userController.createUser.bind(this.userController))
        this.router.put('/users/:id', this.userController.updateUser.bind(this.userController))
    }
}

module.exports = UserRoutes
