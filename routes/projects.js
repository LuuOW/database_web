const express = require('express')
const { route } = require('.')
const router = express.Router()
const verify = require('./verifyToken')


router.get('/', verify, (req, res) => {
    res.render('projects/index')
})

module.exports = router