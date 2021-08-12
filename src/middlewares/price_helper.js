const Product = require('../models/product-model');

exports.getProductObjectId = async (name)=>{
    const product = await Product.findOne({name:name});

    return product._id;
}

exports.nextDay = (dateString)=>{
    let day = new Date(dateString);
    const nDay = day.setDate(day.getDate()+1);
    return nDay;
}