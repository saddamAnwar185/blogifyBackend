const express = require('express')
const { handleCommentpost } = require('../controllers/controllers')
const router = express.Router()

router.post('/addComment', handleCommentpost)

module.exports = router