const express = require('express')
const { handleViewBlog } = require('../controllers/controllers')
const router = express.Router()

router.post('/viewBlog/:blogId', handleViewBlog)

module.exports = router