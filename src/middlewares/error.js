const ErrorResponse = require('../utility/errorResponse');


const errorHandler = (err,req,res,next)=>{
    console.log(err.name);
    res.status(err.status|500).json({
        success:false,
        data: err.message
    });
}

module.exports = errorHandler;
