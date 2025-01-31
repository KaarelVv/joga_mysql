const db = require('../utils/db.js')

const getAllArticles = (req, res) => {
    let sql = 'SELECT * FROM article'
    db.query(sql, (error, result) => {
        console.log(result)
        res.render('index',{
            articles : result
        })
    } )
}  

module.exports = {
getAllArticles
} 