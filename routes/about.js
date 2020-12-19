const express = require('express')
const { route } = require('.')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('about/index')
})

module.exports = router