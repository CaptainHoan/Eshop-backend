const User = require('../models/user')
const express = require('express')

const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const users = await User.find({})
        if(!users) {
            res.status(500).json({message: 'no categories available'})
        }
        res.status(200).json(users)
    }catch(error) {
        res.status(500).json({message: error})
    }
})

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const userWithId = await User.findById(id);
        if(!userWithId) {
            res.status(500).json({message: 'no user with that id'})
        }
        res.status(200).json(userWithId)
    }catch(error) {
        res.status(500)
    }
})

module.exports = router