const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')

class App {
    constructor() {
        this.app = express()
        this.configureViews()
        this.configureMiddleware()
    }

    configureViews() {
        this.app.set('views', path.join(__dirname, '/../views'))
        this.app.set('view engine', 'hbs')
        this.app.engine('hbs', hbs.engine({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, '/../views/layouts/')
        }))
    }

    configureMiddleware() {
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(methodOverride('_method'))
    }

    registerRoutes(routers) {
        routers.forEach((router) => {
            this.app.use('/', router)
        })
    }

    listen(port, callback) {
        this.app.listen(port, callback)
    }
}

module.exports = App
