const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const machineryModel = require('../models/machinery-model');


exports.getAll = async (req, res, next) => {

    try {
        const machinery = await machineryModel.find({}).populate('user', 'name')
        res.json(machinery)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}