const express = require('express')
const { route } = require('.')
const router = express.Router()
const User = require('../models/auth')


router.get('/', (req, res) => {
    res.render('users/index')
})

router.get('/new', (req, res) => {
    res.render('users/new', { user: new User({
        name: req.body.name,
        emial: req.body.email,
        password: req.body.password
    }) })
})

router.post('/', (req, res) => {
    res.send('User registered')
})

module.exports = router