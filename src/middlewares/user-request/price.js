const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.storeRequest = schemaName => async (req,res,next) => {
    let validationObjects = {
        addPrice: () => 
            Joi.object({
                product: Joi.string().required(),
                price: Joi.number().required(),
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
