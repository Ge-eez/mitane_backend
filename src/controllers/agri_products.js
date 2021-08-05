const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');

//@desc Get all the products by category
//@route    api/v1/agri-products/:category
//@access   Public
exports.getProducts = asyncHandler(async (req,res,next)=>{
    const products = await Products.findById(req.params.category);
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
//@route    api/v1/agri-products/:category
//@access   Public
exports.getProductById = asyncHandler(async (req,res,next)=>{

    const products = await Products.findById(req.params.category);
    if(!products){
        return next(new ErrorResponse("Bad request",400));
    }
    

    res.status(200).json({
        success:true,
        data:"Get agriculture products by Id"
    });
  
});


//@desc Create product in specific category
//@desc api/v1/agri-products/:category
//@access   Private
exports.createProduct = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Create agriculture product in specific category"
    });
  
});

//@desc Update product in specific category
//@desc api/v1/agri-products/:category/:id
//@access   Private
exports.updateProduct = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Updated agriculture product in specific category"
    });
    
});

//@desc Delete product in specific category
//@desc api/v1/agri-products/:category/:id
//@access   Private
exports.deleteProduct = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Create agriculture product in specific category"
    });
   
});


