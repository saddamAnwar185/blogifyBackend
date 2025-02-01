const express = require('express')
const router = express.Router()
const {userModel} = require('../models/models')


router.get('/admin', async(req, res) => {
    const allUsers = await userModel.find({})
    res.status(200).json({
        allUsers
    })
})

module.exports = router