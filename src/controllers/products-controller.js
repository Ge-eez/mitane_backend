const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');

//@desc Get all products
//@route    products/
//@filter   products?name
//@filter   category/:categoryId/products
//@access   Public
exports.getProducts = asyncHandler(async (req,res,next)=>{
    let query;
    const {keyword} = req.query;
    
    if(req.params.categoryId){
        query = Products.find({category: req.params.categoryId}).populate({path:'category',select:'name'});
    }else if(keyword){
        query = Products.find({$text: {$search:keyword}}).populate({path:'category',select:'name'});
    }else{
        query = Products.find().populate({path:'category',select:'name'});
    }
    const products = await query;
    if(!products){
        res.status(200).json({
            count: products.length,
            success: true,
            data:products
        });
    }
    res.status(200).json({
        count:products.length,
        success:true,
        data:products
    });
  
});

//@desc Get a products by Id 
//@route    products/:id
//@access   Public
exports.getProductById = asyncHandler(async (req,res,next)=>{

    const products = await Products.findById(req.params.id).populate({path:'category',select:'name'});
    if(!products){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }


    res.status(200).json({
        success:true,
        data:products
    });
  
});


//@desc Create product 
//@desc products/
//@access   Private
exports.createProduct = asyncHandler(async (req,res,next)=>{
    const product = await Products.create(req.body);
    res.status(200).json({
        success:true,
        data: product
    });
  
});

//@desc Update product in specific category
//@desc products/:id
//@access   Private
exports.updateProduct = asyncHandler(async (req,res,next)=>{

    const product = await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    }).populate({path:'category',select:'name'});
    if(!product){
    return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }

    res.status(200).json({
        success:true,
        data:product
    });
    
});

//@desc Delete product in specific category
//@desc products/:id
//@access   Private
exports.deleteProduct = asyncHandler(async (req,res,next)=>{
    const product = await Products.findByIdAndDelete(req.params.id).populate({path:'category',select:'name'});
    
    if(!product){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }

    res.status(200).json({
        success:true,
        data:product
    });
   
});


