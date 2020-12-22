//all the imports
const bcrypt = require('bcryptjs')
const express = require('express')
const { route } = require('.')
const router = express.Router()
const User = require('../models/auth')
const Joi = require('@hapi/joi')
const { registerValidation } = require('./validation')

//validation parameters
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.get('/', (req, res) => {
    res.render('users/index')
})

router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
})


router.post('/new', async (req, res) => {

    //Validation

    const {error} = registerValidation(req.body)

    if(error) return res.status(400).send(error.details[0].message)
    const emailDuplicate = await User.findOne({email: req.body.email})

    if(emailDuplicate) return res.status(400).send('Email already exist in the database...')

    //Hashing user's password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //creating new user

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const saveUser = await user.save()
        res.send(saveUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/', (req, res) => {
    res.send('User registered')
})

module.exports = router