const storeModel = require('../models/store-model')

exports.getAll = async (req, res, next) => {

    try {
        const stores = await storeModel.find({})
        res.json(stores)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}

exports.getByID = async (req, res) => {

    try {
        const store = await storeModel.findById(req.params.id)
        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}
exports.getByUserId = async (req, res) => {
    const { user } = req
    try {
        const store = await storeModel.findById(req.params.user_id)
        if(!store){
            console.log(user.role)
        }
        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.createStore = async (req, res) => {
    const { user } = req
    console.log(user)
    try {
        console.log(user.role)
        const store = await storeModel.create({user: user._id});

        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.updateStore = async (req, res) => {}
exports.deleteStore = async (req, res) => {}
exports.getByMachineryId = async (req, res) => {}
exports.getByProductId = async (req, res) => {}
exports.getByKeyword = async (req, res) => {}
exports.addItem = async (req, res) => {}
exports.deleteItem = async (req, res) => {}
exports.adjustItem = async (req, res) => {}
exports.clearStore = async (req, res) => {}