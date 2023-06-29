const Order = require('../models/order')
const express = require('express')

const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const orders = await Order.find({})
        if(!orders) {
            res.status(500).json({message: 'no categories available'})
        }
        res.status(200).json(orders)
    }catch(error) {
        res.status(500).json({message: error})
    }
})

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const orderWithId = await Order.findById(id);
        if(!orderWithId) {
            res.status(500).json({message: 'no user with that id'})
        }
        res.status(200).json(orderWithId)
    }catch(error) {
        res.status(500)
    }
})

module.exports = router;