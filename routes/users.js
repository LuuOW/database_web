const express = require('express')
const { route } = require('.')
const router = express.Router()
const User = require('../models/signup')


router.get('/', (req, res) => {
    res.render('users/index')
})

router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
})

router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router