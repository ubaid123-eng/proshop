import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc create new orders
//@    POST/Api/orders
//@    Private

const AddOrderItems = asyncHandler(async(req, res) => {

    const {
    orderitems,
    shippingAddress,
    paymentMethod, 
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice, 
    } = req.body


    if(orderitems && orderitems.length === 0){
        res.status(401)
        throw new Error ('No Order Items')
        return
    } else {
        const order = new Order ({
            orderitems,
            user: req.user._id,
            shippingAddress,
            paymentMethod, 
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,    

        })
     
        //saving to the database
        const CreatedOrder = await order.save()
        
        res.status(201).json(CreatedOrder)
   

    }

})



//@desc Get Order By Id
//@    Get/Api/orders/:id
//@    Private

const GetOrdersById = asyncHandler(async (req,res)=> {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error ('Order Not Found')
    }
}) 



//@desc Update Order To Paid
//@    put/Api/orders/:id/pay
//@    Private

const UpdatedOrderToPaid = asyncHandler(async (req,res)=> {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.PaidAt = Date.now()
        //below all things from paypal in paymenresult
        order.PaymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
         }

         const UpdatedOrder = await order.save() //saving to database

         res.json(UpdatedOrder)

    } else {
        res.status(404)
        throw new Error ('Order Not Found')
    }
}) 




//@desc Get Order To User Profile
//@    put/Api/orders/myorders
//@    Private

const GetMyOrders = asyncHandler(async (req,res)=> {
    const orders = await Order.find({user: req.user._id})

    res.json(orders)
}) 



export {AddOrderItems, GetOrdersById, UpdatedOrderToPaid, GetMyOrders}