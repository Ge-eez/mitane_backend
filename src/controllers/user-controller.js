const userModel = require('../models/user-model');
const errorResponse = require('../utility/errorResponse');



/*
@Description: Get all users
@Route: users/
@Access: Public
*/
exports.getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}).populate('roles', 'name').populate('permissions', 'name');
        res.json(users)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}



