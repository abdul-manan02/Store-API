require('dotenv').config()

const connectDb = require('./db/connect')
const products = require('./models/product')
const jsonProducts = require('./products.json')

const start = async(req,res) =>{
    try {
        await connectDb(process.env.MONGO_URI)
        await products.deleteMany()
        await products.create(jsonProducts)
        console.log('POPULATED')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()