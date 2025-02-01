const express = require('express')
const { handleDeleteBlog } = require('../controllers/controllers')
const router = express.Router()

router.delete('/deleteBlog/:id', handleDeleteBlog)

module.exports = router