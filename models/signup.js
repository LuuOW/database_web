const mongoose = require('mongoose')

const userName = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Name', userName)