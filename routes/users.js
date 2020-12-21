const express = require('express')
const { route } = require('.')
const router = express.Router()
const User = require('../models/auth')

const Joi = require('@hapi/joi')

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.get('/', (req, res) => {
    res.render('users/index')
})


router.post('/new', async (req, res) => {

    const validation = schema.validate(req.body)
    res.send(validation)

    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // try {
    //     const saveUser = await user.save()
    //     res.send(saveUser)
    // } catch (err) {
    //     res.status(400).send(err)
    // }
})

router.post('/', (req, res) => {
    res.send('User registered')
})

module.exports = router