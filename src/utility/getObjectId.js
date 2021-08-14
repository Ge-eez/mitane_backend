const Product = require('../models/product-model');
const Category = require('../models/category-model');


exports.getProductObjectId = async (name)=>{
    const product = await Product.findOne({name:name});
    if(!product) return null;
    return product._id;
}

exports.getCategoryObjectId = async (name)=>{
    const category = await Category.findOne({name:name});
    if(!category) return null;
    return category._id;
}