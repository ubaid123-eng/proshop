import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errormiddleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
// import products from './data/products.js'

import ProductRoutes  from './routes/ProductRoutes.js'
import userRoutes  from './routes/userRoutes.js'
import OrderRoutes  from './routes/OrderRoutes.js'

dotenv.config()

connectDB()

const app  = express()

app.use(express.json()) //allow us to accept the json data which is in the body of postman...


app.get('/', (req , res) => {
    res.send('API Is Running.....')
})


// app.get('/api/products', (req , res) => {
//     res.json(products)
// })

// app.get('/api/products/:id', (req , res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })


app.use('/api/products', ProductRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', OrderRoutes)

//paypal client api fetching from environment .env
app.get('/api/config/paypal', (req,res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold
  )
)