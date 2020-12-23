//all the imports
const bcrypt = require('bcryptjs')
const express = require('express')
const { route } = require('.')
const router = express.Router()
const User = require('../models/auth')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation')

//validation parameters
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
})

router.get('/', (req, res) => {
    res.render('users/index')
})

router.get('/new', (req, res) => {
    res.render('users/new')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

//Register new user

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

    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const saveUser = await user.save()
        res.send('User Succesfully registered')
    } catch (err) {
        res.status(400).send(err)
    }
})

//Login

router.post('/login', async (req, res) => {
    //Validate user
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //Check if user exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong, please check and try again')
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or password is wrong, please check and try again')
    
    //Create and assign a token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    
    res.send('Logged in!')

})

module.exports = router
