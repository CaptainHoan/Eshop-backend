const Category = require('../models/category')
const express = require('express')

const router = express.Router()

router.get("/", async(req, res) => {
    const categories = await Category.find({}).populate('category')
    if(!categories) {
        res.status(404).json({message: 'no category'})
    }
    res.status(200).json(categories)
})

router.get("/:id", async(req, res) => {
    const categoryWithId = await Category.findById(req.params.id).populate('category')
    if(!categoryWithId) {
        res.status(500).json({message: "none with that id"})
    }
    res.status(200).json(categoryWithId)
})

router.put("/:id", async(req, res) => {
    const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
    if(!updateCategory) {
        res.status(500).json({message: "none with that id"})
    }
})

router.post("/", (req, res) => {
    const postCategory = new Category({
        name: req.body.name,
        image: req.body.image,
        icon: req.body.icon,
        color: req.body.color
    })
    postCategory.save().then((postedCategory) => {
        res.status(200).json(postedCategory)
    }).catch((err) =>{
        res.status(500).json({message: err})
    })
})

router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id)
    if(!deleteCategory) {
        res.status(500).json({message: "cannot find"})
    }
    res.send(deleteCategory)
})

module.exports = router