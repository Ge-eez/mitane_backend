const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Ingredients = require('../models/ingredient-model');

exports.getAll = async function (req,res,next){
    const {name} = req.query;
   try{
       if(name){
        var ingredients = await Ingredients.find({name:name});
        res.status(200).json({ingredients});
       }
       else{
           var ingredients = await Ingredients.find({});
           res.status(200).json({ingredients});
       }

   } 
   catch (e) {
       res.status(400).json({
        status: 400, message: e.message});
}


}

exports.getIngredientById = async function (req,res,next){
    try{
  var ingredients = await Ingredients.findById(req.params.id);
  res.status(200).json({ingredients});

    }
    catch(e){
        res.status(400).json({
            status: 400, message: e.message});

    }
}

exports.addIngredient = async function (req,res,next){
    try{
        var ingredients = await Ingredients.create(req.body);
        res.status(200).json({ingredients});
    }
    catch(e){
        res.status(400).json({
            status: 400, message: e.message});

    }

}

exports.updateIngredient = async function (req,res,next){
    try{
       var ingredients = await Ingredients.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).json({ingredients});
    }
    catch(e){
        res.status(400).json({
            status: 400, message: e.message});

    }

}

exports.deleteIngredient = async function (req,res,next){
    try{
       var ingredients = await Ingredients.findByIdAndDelete(req.params.id)
       res.status(200).json({ingredients});
    }
    catch(e){
        res.status(400).json({
            status: 400, message: e.message});

    }

}

