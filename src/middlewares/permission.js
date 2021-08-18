const ErrorResponse = require('../utility/errorResponse');

exports.permission = ()=>(req,res,next)=>{
    const {user} = req;
    if(user){
        const role = user.data.roles[0];
        if(role === 'admin'){
            next();
        }else{
            res.status(401).json({
                success:false,
                msg: "Can't access this route unauthorized"
            });
        }
    }else{
        res.status(401).json({
            success:false,
            msg: "Can't access this route unauthorized"
        });
    }
    
}
exports.pricePermission = ()=>(req,res,next)=>{
    const {user} = req;
    if(user){
        const role = user.data.roles[0];
        if(role === 'data_encoder'){
            next();
        }else{
            res.status(401).json({
                success:false,
                msg: "Can't access this route unauthorized"
            });
        }
    }else{
        res.status(401).json({
            success:false,
            msg: "Can't access this route unauthorized"
        });
    }
    
}