const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');

//@desc Get all products
//@route    products/
//@filter   products?name
//@filter   category/:categoryId/products
//@access   Public
exports.getProducts = asyncHandler(async (req,res,next)=>{
    let products;
    const {name} = req.query;
    
    if(req.params.categoryId){
        products = await Products.find({category: req.params.categoryId});
    }else if(name){
        products = await Products.find({name:name});
    }else{
        products = await Products.find();
    }
    
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

    const products = await Products.findById(req.params.id);
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
    });
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
    const product = await Products.findByIdAndDelete(req.params.id);
    
    if(!product){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }

    res.status(200).json({
        success:true,
        data:product
    });
   
});


