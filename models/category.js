const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: String
    },
    icon: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    },

})

const Category = mongoose.model("category", categorySchema)

module.exports = Category;