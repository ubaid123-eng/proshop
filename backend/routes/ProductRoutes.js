import express from 'express'
// import asyncHandler from 'express-async-handler'
import {getProducts, getProductById} from '../Conrollers/ProductControllers.js'
const router = express.Router()
// import Product from '../models/productModel.js'


//@desc Fetch All Products
//@    Get/Api/Products
//@    Public

router.route('/').get(getProducts)    //by using contollers

// router.get(
//     '/', 
//     asyncHandler(async(req , res) => {
    
//     const products = await Product.find({})
//     res.json(products)
// })
// )







//@desc Fetch Single Product
//@    Get/Api/Product/:id
//@    Public

router.route('/:id').get(getProductById)   //by using contollers

// router.get(
//     '/:id', 
//     asyncHandler(async(req , res) => {

//     // const product = products.find((p) => p._id === req.params.id)
//     const product = await Product.findById(req.params.id)

//     if(product){
//         res.json(product)
//     } else {
//         res.status(404)
//         // .json({message : 'Product Not Found' })
//         throw new Error ('Product Not Found')
//     }
    
// })
// )


export default router