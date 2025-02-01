const express = require('express')
const { handleLogin } = require('../controllers/controllers')
const router = express.Router()

router.post('/login', handleLogin)


module.exports = router