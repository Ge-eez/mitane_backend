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
        });
    }
}

/*
@Description: Get a user by ID
@Route: users/:id
@Access: Public
*/
exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}

/*
@Description: Get users by role
@Route: users/:role
@Access: Public
*/



