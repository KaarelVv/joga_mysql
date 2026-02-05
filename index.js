require('dotenv').config()
const app = require('./utils/app')
const db = require('./utils/db')

const articleRoutes = require('./routes/articles.js')
app.use('/', articleRoutes)

app.listen(3012, () => {
    console.log('Web server is connected at port 3012')
})