const ErrorResponse = require('../utility/errorResponse');


const errorHandler = (err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        success:false,
        data: err.message
    });
}

module.exports = errorHandler;
