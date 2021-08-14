var jwt = require('jsonwebtoken');
const authServices = require('../services/auth-services');
const { jwt_key } = require('../config/vars')
const userModel = require('../models/user-model')
const roleModel = require('../models/role-model')

exports.login = async (req, res) => {

    try {
        const user = await userModel.findOne({
                phone_no: req.body.phone_no
            }).populate({ path: 'roles', populate: {path: 'permissions'} });

        if(user && await user.verifyPassword(req.body.password)){
            // 1. map through all roles
            // 2. find each permissions inside the role
            // 3. combine permissions
            let permissions =  user._doc.roles.reduce((prev, next) => {
                return [...prev, ...next.permissions.map(permission => permission.name)]
            },[])
            user._doc.permissions = Array.from(new Set([...user._doc.permissions.map(v => v.name), ...permissions ]))

            user._doc.roles = user._doc.roles.map(role => role.name)
           return res.json({
               ...user._doc,
               token: jwt.sign({data: user._doc, exp: Math.floor(Date.now() / 1000) + (60 * 60),}, jwt_key, { algorithm: 'HS256' })
            })
        }

       throw new Error("phone/password not found")

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.signupUser = async (req, res) => {

    try {
        let data = await roleModel.find({
            name: {
                $in: 'user' 
            }
        })
        const user = await authServices.signupUser(req, data);

        res.json(user)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}
exports.signupFarmer = async (req, res) => {

    try {
        let data = await roleModel.find({
            name: {
                $in: 'farmer' 
            }
        })
        const user = await authServices.signupUser(req, data);
        res.json(user)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}
exports.signupToolTrader = async (req, res) => {

    try {
        let data = await roleModel.find({
            name: {
                $in: 'tool_trader' 
            }
        })
        const user = await authServices.signupUser(req, data);
        res.json(user)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}
exports.signupProductTrader = async (req, res) => {

    try {
        let data = await roleModel.find({
            name: {
                $in: 'product_trader' 
            }
        })
        const user = await authServices.signupUser(req, data);
        res.json(user)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}
exports.signupAccessoryTrader = async (req, res) => {

    try {
        let data = await roleModel.find({
            name: {
                $in: 'accessory_trader' 
            }
        })
        const user = await authServices.signupUser(req, data);
        res.json(user)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.logout = async (req, res) => {
    
    try {
        return res.json({
            status: true,
            data: 'not processed yet'         
        })

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}




