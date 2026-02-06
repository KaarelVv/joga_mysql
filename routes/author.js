const express = require('express')
const AuthorController = require('../controllers/author.js')
const router = express.Router()

const authorCtrl = new AuthorController()

router.get('/author/:id', (req, res) => {
    authorCtrl.getAuthorById(req, res)
})

module.exports = router