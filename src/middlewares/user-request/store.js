const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.storeRequest = schemaName => async (req,res,next) => {
    let validationObjects = {
        addProduct: () => 
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        addMachinery: () => 
            Joi.object({
                machinery: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        addIngredient: () => 
            Joi.object({
                ingredient: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        adjustProduct: () => 
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        adjustMachinery: () => 
            Joi.object({
                machinery: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        adjustIngredient: () => 
            Joi.object({
                ingredient: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        removeProduct: () => 
            Joi.object({
                product: Joi.string().required(),
            }),
        removeMachinery: () => 
            Joi.object({
                machinery: Joi.string().required(),
            }),
        removeIngredient: () => 
            Joi.object({
                ingredient: Joi.string().required(),
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
