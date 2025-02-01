const express = require('express')
const router = express.Router()

router.post('/logout', (req, res) => {
    res.clearCookie('uid')
    res.status(200).json({
        'sucess': true,
        'messege': 'Yor are Logout'
    })
})

module.exports = router