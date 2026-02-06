require('dotenv').config()
const App = require('./utils/app')
const Database = require('./utils/db')
const Server = require('./utils/server')

const ArticleModel = require('./models/article')
const AuthorModel = require('./models/author')

const ArticlesController = require('./controllers/articles')
const AuthorController = require('./controllers/author')

const ArticlesRoutes = require('./routes/articles')
const AuthorRoutes = require('./routes/author')

const PORT = 3012

async function bootstrap() {
    const db = new Database()
    await db.connect()
    const connection = db.getConnection()

    const articleModel = new ArticleModel(connection)
    const authorModel = new AuthorModel(connection)

    const articlesController = new ArticlesController(articleModel)
    const authorController = new AuthorController(authorModel, articleModel)

    const articlesRoutes = new ArticlesRoutes(articlesController)
    const authorRoutes = new AuthorRoutes(authorController)

    const app = new App()
    app.registerRoutes([articlesRoutes.router, authorRoutes.router])

    const server = new Server(app, PORT)
    server.start(() => {
        console.log(`Web server is connected at port ${PORT}`)
    })
}

bootstrap().catch((error) => {
    console.error('Failed to start server', error)
    process.exit(1)
})
