const express = require('express')
const { handleSingUp } = require('../controllers/controllers')
const router = express.Router()
const upload = require('../controllers/multer')

router.post('/singUp', upload.single('file') ,handleSingUp)

module.exports = router