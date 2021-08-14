const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.storeRequest = schemaName => async (req,res,next) => {
    let validationObjects = {
        addProduct: () => 
            Joi.object({
                
            }),
        addMachinery: () => 
            Joi.object({
                
            }),
        addIngredient: () => 
            Joi.object({
                
            }),
        adjustProduct: () => 
            Joi.object({
                
            }),
        adjustMachinery: () => 
            Joi.object({
                
            }),
        adjustIngredient: () => 
            Joi.object({
                
            }),
        removeProduct: () => 
            Joi.object({
                
            }),
        removeMachinery: () => 
            Joi.object({
                
            }),
        removeIngredient: () => 
            Joi.object({
                
            }),
    }
    try {
       const {error } =  validationObjects[schemaName]().validate(req.body)
       if(!error) {
           return next();
       }
       throw new Error(error)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}
