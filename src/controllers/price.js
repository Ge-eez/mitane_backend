const asyncHanler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Price = require('../models/price-model');
const Product = require('../models/product-model');



//@desc Get daily price
//@route    Get price/
//@route    Get price?product="product"
//@route    Get price?day="yyyy-mm-dd"
//@access   Public
exports.getDailyPrice = asyncHanler(async (req,res,next)=>{
    let {product,day} = req.query;
    let dailyPrice;

    if(product){
        product = await getProductObjectId(product);
        if(!product){
            return next(new ErrorResponse('object id not found',400));
        }
        dailyPrice = await Price.find({product:product._id}).populate({path:'product',select:'name'});
    }else if(day){
        day = 
        dailyPrice = await Price.find({price_of_the_day:{$elemMatch:{day :
            {
                "$gte" : new Date(day), 
                "$lt" : nextDay(day)
            } 
        }}}).populate({path:'product',select:'name'});
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

//@desc Get daily price by Id
//@route    Get price/:id
//@access   Private
exports.getDailyPriceById = asyncHanler(async (req,res,next)=>{
    const dailyPrice = await Price.findOne(req.params.id);

    if(!dailyPrice){
        return next(new ErrorResponse(`Resource with id ${req.params.id} not found`,400));
    }

    res.status(200).json({
        
        success:true,
        data: dailyPrice
    });
});

//@desc Create daily price
//@route    Post price/
//@access   Private
exports.createDailyPrice = asyncHanler(async (req,res,next)=>{
    let dailyPrice;
    let {product,price} = req.body;
    const objId = await getProductObjectId(product);

    if(!objId){
        return next(new ErrorResponse('object id not found',400));
    }
    price = [{'price':price}];
    dailyPrice = await 
        Price.create({product:objId, price_of_the_day:price});
    
    res.status(200).json({
        success:true,
    });
});

//@desc Update daily price
//@route    Put price/:productId
//@access   Private
exports.updateDailyPrice = asyncHanler(async (req,res,next)=>{
    const {price} = req.body;
    const dailyPrice = await Price.findOneAndUpdate({product:req.params.productId},{$push:{price_of_the_day:[{price}]}},{
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

//@desc Delete daily price
//@route    delet price/:productId
//@access   Private
exports.deleteDailyPrice = asyncHanler(async (req,res,next)=>{

    const dailyPrice = await Price.findOneAndDelete({product:req.params.productId}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource with id ${req.params.productId} not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});


const getProductObjectId = async (name)=>{
    const product = await Product.findOne({name:name});

    return product;
}

const nextDay = (dateString)=>{
    let day = new Date(dateString);
    const nDay = day.setDate(day.getDate()+1);
    return nDay;
}