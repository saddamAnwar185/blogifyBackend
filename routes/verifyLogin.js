const express = require('express')
const router = express.Router()

router.get('/verifyUser', (req, res) => {
    res.json({
        success: true,
        'messege': 'User is Login'
    })
})

module.exports = router