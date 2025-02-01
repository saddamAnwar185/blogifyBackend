const express = require('express')
const router = express.Router()
const {blogModel} = require('../models/models')
const path = require('path')

router.get('/showPics/:id', async(req, res) => {
    const id = req.params.id
    const image = await blogModel.findById(id)
    const imagePath = path.join(__dirname, '../' , image.coverImage)
    res.sendFile(imagePath)
})

module.exports = router