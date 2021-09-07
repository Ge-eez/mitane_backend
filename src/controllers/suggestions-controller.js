const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');
const Price = require('../models/price-model');
const productModel = require('../models/product-model');
exports.getSuggestionsBasedOnPrice = asyncHandler(async(req,res,next) =>{   
    try{
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
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

exports.getSuggestionsBasedOnWeather = asyncHandler(async(req,res,next) =>{   
    try{
        const weathers = ['authumn','spring','summer','winter']
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        let weather;
        switch(currentMonth){
            case 12:
            case 1:
            case 2:
                weather = weathers[3];
                break;
            case 3:
            case 4:
            case 5:
                weather = weathers[1];
                break;
            case 9:
            case 10:
            case 11:
                weather = weathers[0];
                break;
            case 6:
            case 7:
            case 8:
                weather = weathers[2];
                break;
        }
        const suggestions = await productModel.find({
            weather: { $in: 
                weather
            }
        })

        res.status(200).json({
            status:true,
            data: suggestions
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})


