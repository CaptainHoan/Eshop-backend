const express = require('express')
const Product = require('../models/product');
const Category = require('../models/category');

const router = express.Router();

//get all product
router.get("/isFeatured", async(req, res) => {
    try {
        const products = await Product.find({isFeatured: false}).limit(1)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: 'cannot find any product'})
    }
})

//validate an object id => mongoose.isValidateObjectId() => return boolean

//get a particular product
router.get("/:id", async(req, res) => {
    const productWithId = await Product.findById(req.params.id)
    if(!productWithId) {
        res.status(500).json({message: 'cant find any product with that id'})
    }
    res.send(productWithId)
})

//post product
router.post("/", async(req, res) => {

    const category = await Category.findById(req.body.category)
    if(!category) {
        res.status(400).json({message: "invalid category"})
    }

    const postProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.richDescription,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    }) 
    
    const product = await postProduct.save();
    if(!product) {
        res.status(500).send('The product cannot be created')
    }
    res.status(200).json(product)
    
})

//update product
router.put("/:id", async(req, res) =>{
    const {id} = req.params;
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, req.body);
        if(!updateProduct) {
            res.status(500).json({message: 'cant update product'})
        }
        const product = await Product.find({})
        res.status(201).json(product)
    }catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router