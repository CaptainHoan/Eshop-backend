const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model("order", orderSchema)

module.exports = Order