const express = require('express')
const router = express.Router()
const {blogModel} = require('../models/models')

router.get('/myProfile/:id', async(req, res) => {
    const id = req.params.id
    const blogs = await blogModel.find({createdBy: id}).populate('createdBy')
    if(blogs){
        res.status(200).json({
            blogs
        })
    } else if(!blogs){
        res.json({
            'sucess': false,
            'messege': 'No blogs'
        })
    }


})

module.exports = router