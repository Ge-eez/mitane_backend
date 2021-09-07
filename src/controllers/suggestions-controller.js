const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');
const Price = require('../models/price-model');
exports.getSuggestionsBasedOnPrice = asyncHandler(async(req,res,next) =>
{   
    let price = {price_of_the_day:{price}}
    let suggestions = await Price.aggregate([
        { $lookup:
           {
             from: 'Products',
             localField: 'product',
             foreignField: 'name',
             as: 'suggestedProducts'
           },
         },

         {
             $unwind: "$suggestedProducts"
         },
         {
            $sort:  {price :-1}
         },
         {$limit:10}
        ])

    res.status(200).json({
        status:true,
        data: suggestions
    });


}
)


exports.getSuggestionsBasedOnWeather = asyncHandler(async(req,res,next) =>
{   }



