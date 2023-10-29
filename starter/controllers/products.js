const product = require('../models/product')

const getAllProducts = async(req,res) =>{
    //throw new Error('testing async package')
    const{featured, company, name, sort, fields} = req.query
    const queryObject = {}
    

    if(featured) {queryObject.featured = featured===true ? true : false}

    if(company) {queryObject.company = company}

    if(name) {queryObject.name = {$regex:name, $options: 'i'}}

    let result = product.find(queryObject)
    console.log(queryObject)

    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createAt')
    }
    
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    
    const limit = Number(req.query.limit) || 23
    const page = Number(req.query.page) || 1
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProducts
}