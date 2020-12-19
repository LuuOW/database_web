const express = require('express')
const { route } = require('.')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('home/index')
})

module.exports = router