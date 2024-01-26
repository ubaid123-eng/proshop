import express from 'express'
const router = express.Router()

import { AddOrderItems, GetMyOrders, GetOrdersById, UpdatedOrderToPaid } from '../Conrollers/OrderControllers.js'
import { protect } from '../middleware/authmiddleware.js'


router.route('/').post(protect, AddOrderItems) 
router.route('/myorders').get(protect, GetMyOrders) 
router.route('/:id').get(protect, GetOrdersById) 
router.route('/:id/pay').put(protect, UpdatedOrderToPaid) 



export default router