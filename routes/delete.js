const express = require('express')
const { handleDelete } = require('../controllers/controllers')
const router = express.Router()

router.delete('/delete/:id', handleDelete)

module.exports = router