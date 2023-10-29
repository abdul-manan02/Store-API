const express = require('express')
const app = express()
require('express-async-errors')
const productsRouter = require('./routes/products')
const errorHandler_MiddleWare = require('./middleware/error-handler')
const notFound_MiddleWare = require('./middleware/not-found')
require('dotenv').config()
const connectDb = require('./db/connect')

app.use(express.json())
app.use('/api/v1/products', productsRouter)
app.use(errorHandler_MiddleWare)
app.use(notFound_MiddleWare)

app.get('/', (req,res)=>{
    res.send(
        '<h1> STORE API HOME PAGE </h1><a href="api/v1/products">Products</a>'
    )
})

const port = process.env.PORT || 5000
const start = async() =>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`LISTENING ON PORT ${port}`))
    } catch (error) {
        console.log(error)
    }
    app.listen()
}

start()