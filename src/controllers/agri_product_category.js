const Categories = require('../models/category-model');
const ErrorResponse = require('../utility/errorResponse');
const asyncHandler = require('../middlewares/async');

//@desc Get All Category
//@route    category/
//@filter   category?name
//@access   public
exports.getCategory = asyncHandler(async (req,res,next)=>{
    let category;
    
    if(req.query){
        category = await Categories.find(req.query);
    }else{
        category = await Categories.find();
    }
    
    if(!category){
        res.status(200).json({
            success:true,
            count: category.length,
            data:category
        });
    }
    res.status(200).json({
        success:true,
        count: category.length,
        data:category
    });

});

//@desc Get Category by Id 
//@route    category/:id
//@access   public
exports.getCategoryById = asyncHandler(async (req,res,next)=>{

    const category = await Categories.findById(req.params.id);
    if(!category){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        data:category
    });

});





//@desc Create Category
//@route    category/
//@access   private
exports.createCategory = asyncHandler(async (req,res,next)=>{

    const category = await Categories.create(req.body);
    res.status(200).json({
        success:true,
        data:category
    });

});


//@desc Update category
//@desc category/:id
//@access   Private
exports.updateCategory = asyncHandler(async (req,res,next)=>{

    const category = await Categories.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    console.log(req.body);
    if(!category){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        data:category
    });
    
});


//@desc Delete Category 
//@desc api/v1/agri-products/category/:id
//@access   Private
exports.deleteCategory = asyncHandler(async (req,res,next)=>{
    
    const category = await Categories.findByIdAndDelete(req.params.id);
    if(!category){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        data: category
    });
   
});

