const Categories = require('../models/category-model');
const ErrorResponse = require('../utility/errorResponse');
const asyncHandler = require('../middlewares/async');

//@desc Get All Category
//@route    api/v1/category
//@access   public
exports.getCategory = asyncHandler(async (req,res,next)=>{

    const category = await Categories.find();
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
//@route    api/v1/category/:id
//@access   public
exports.getCategoryById = asyncHandler(async (req,res,next)=>{

    const category = await Categories.find(req.params.id);
    if(!category){
        return next(new ErrorResponse("Bad request",400));
    }
    res.status(200).json({
        success:true,
        data:category
    });

});

//@desc Create Category
//@route    api/v1/category/
//@access   private
exports.createCategory = asyncHandler(async (req,res,next)=>{

    const category = await Categories.create(req.body);
    res.status(200).json({
        success:true,
        data:category
    });

});


//@desc Update category
//@desc api/v1/agri-products/category/:id
//@access   Private
exports.updateCategory = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Updated category"
    });
    
});

//@desc Delete Category 
//@desc api/v1/agri-products/category/:id
//@access   Private
exports.deleteCategory = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Delete category"
    });
   
});

