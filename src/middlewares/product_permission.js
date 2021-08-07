const ErrorResponse = require('../utility/errorResponse');

exports.productPermission = ()=>(req,res,next)=>{
    const {user} = req;
    const role = user.data.roles[0];
    if(role === 'farmer'){
        next();
    }else{
        res.status(401).json({
            success:false,
            msg: "Can't access this route unauthorized"
        });
    }
}