const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

class App {
    constructor() {
        this.app = express()
        this.configureViews()
        this.configureMiddleware()
        this.configureSession()
        this.configureTemplateLocals()
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

    configureSession() {
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'thisismysecretkey',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60 * 60 * 1000 * 24 } // 24 hour
        }))
    }

    configureTemplateLocals() {
        this.app.use((req, res, next) => {
            res.locals.user = req.session ? req.session.user : null
            next()
        })
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
