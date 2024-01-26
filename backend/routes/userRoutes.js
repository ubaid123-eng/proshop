import express from 'express'
const router = express.Router()

import {authUser ,regUser, getUserProfile, 
    updateUserProfile, getAllUsers} from '../Conrollers/UserControllers.js'
import { protect,admin } from '../middleware/authmiddleware.js'


router.route('/').post(regUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)    //


// we provide here the protect cause it is private
router.route('/profile').get(protect, getUserProfile)
.put(protect, updateUserProfile)

export default router