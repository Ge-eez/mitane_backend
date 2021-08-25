const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');
exports.getSuggestionsBasedOnPrice = asyncHandler(async(req,res,next) =>
{
    let suggestions = await Products.find().sort({ length: -1 }).limit(10);
    
    let suggestionArray = [];
    suggestions.forEach(item => {
          suggestionArray.push(item.name)
    });


}




)

