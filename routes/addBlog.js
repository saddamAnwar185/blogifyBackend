const express = require('express')
const { handleBlogPost } = require('../controllers/controllers')
const router = express.Router()
const upload = require('../controllers/multer')




router.post('/addBlog', upload.single('file') ,handleBlogPost)

module.exports = router