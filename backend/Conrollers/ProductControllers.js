import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



//@desc Fetch All Products
//@    Get/Api/Products
//@    Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
})




//@desc Fetch Single Product
//@    Get/Api/Product/:id
//@    Public
const getProductById = asyncHandler(async (req,res) => {
   
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        // .json({message : 'Product Not Found' })
        throw new Error ('Product Not Found')
    }
})

export {
    getProducts,
    getProductById
}