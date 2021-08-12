const asyncHanler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Price = require('../models/price-model');

const {getProductObjectId,nextDay} = require('../middlewares/price_helper');


//@desc Get daily price
//@route    Get price/
//@route    Get price?product="product"
//@route    Get price?day="yyyy-mm-dd"
//@access   Public
exports.getDailyPrice = asyncHanler(async (req,res,next)=>{
    let {product,day} = req.query;
    let dailyPrice;

    if(product){
        let objId = await getProductObjectId(product);
        if(!product){
            return next(new ErrorResponse('product not found',400));
        }
        dailyPrice = await Price.find({product:objId}).populate({path:'product',select:'name'});
    }else if(day){
        dailyPrice = await Price.find({price_of_the_day:{$elemMatch:{day :
                        {
                            '$gte' : new Date(day), 
                            '$lt' : nextDay(day)
                        }}}},{'price_of_the_day.$':1}).populate({path:'product',select:'name'});
    }else{
        dailyPrice = await Price.find({}).populate({path:'product',select:'name'});
    }

    if(!dailyPrice){
        return next(new ErrorResponse("Resource not found",400));
    }
    res.status(200).json({
        count:dailyPrice.length,
        success:true,
        data:dailyPrice
    });
});

//@desc Get daily price of specific product
//@route    Get price/:productName?date=date
//@access   Private
exports.getDailyPriceByProduct = asyncHanler(async (req,res,next)=>{
    const {date} = req.query;
    let objId = await getProductObjectId(req.params.productName);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.find({product:objId},
        {price_of_the_day:{$elemMatch:{day :
                            {
                                '$gte' : new Date(date), 
                                '$lt' : nextDay(date)
                            }}}},{'price_of_the_day.$':1}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});


//@desc Create daily price
//@route    Post price/
//@access   Private
exports.createDailyPrice = asyncHanler(async (req,res,next)=>{
    let dailyPrice;
    let {product} = req.body;
    const objId = await getProductObjectId(product);

    if(!objId){
        return next(new ErrorResponse('Product not found',400));
    }

    dailyPrice = await Price.create({product:objId});
    
    res.status(200).json({
        success:true,
    });
});

//@desc Update daily price
//@route    Put price/:productId
//@access   Private
exports.addDailyPrice = asyncHanler(async (req,res,next)=>{
    console.log("add");
    const {price} = req.body;
    let objId = await getProductObjectId(req.params.productName);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndUpdate({product:objId},{$push:{price_of_the_day:[{price}]}},{
        new:true,
        runValidators:true
    }).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource with id ${req.params.productId} not found`,400));
    }

    res.status(201).json({
        success:true,
        data:dailyPrice
    });

});

//@desc Delete product price
//@route    delet price/:productName
//@access   Private
exports.deleteProductPrice = asyncHanler(async (req,res,next)=>{
    let objId = await getProductObjectId(req.params.productName);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndDelete({product:objId}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource with id ${req.params.productId} not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});

//@desc Delete daily price
//@route    delet price?productName?date=date
//@access   Private
exports.deleteDailyPrice = asyncHanler(async (req,res,next)=>{
    console.log("delete");
    const {product,date} = req.query;
    let objId = await getProductObjectId(product);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndUpdate({product:objId},
        {$pull:{price_of_the_day:{
            day:{
                "$gte" : new Date(date), 
                "$lt" : nextDay(date)
            } 
        }}},{returnDocument:'after'}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});


