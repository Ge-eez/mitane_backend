const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const machineryModel = require('../models/machinery-model');
const { $where } = require('../models/machinery-model');


exports.getAll = async (req, res, next) => {

    const { name } = req.query;

    try {
        if (name) {
            const machinery = await machineryModel.find({ name: req.query.name })
            res.json(machinery)
        }
        else {
            const machinery = await machineryModel.find({}).populate('user', 'name')
            res.json(machinery)
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}
exports.getByID = async (req, res) => {

    try {
        const machinery = await machineryModel.findById(req.params.id)
        res.json(machinery)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}
