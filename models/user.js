const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;