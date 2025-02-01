const express = require('express')
const router = express.Router()
const {userModel} = require('../models/models')
const path = require('path')

router.get('/showProfilePic/:id', async(req, res) => {
    const id = req.params.id
    const image = await userModel.findById(id)
    const imagePath = path.join(__dirname, '../' , image.profilePic)
    res.sendFile(imagePath)
})

module.exports = router