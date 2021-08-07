const storeModel = require('../models/store-model')

exports.getAll = async (req, res, next) => {

    try {
        const stores = await storeModel.find({}).populate('user', 'name').populate('product_items.product', 'name')
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
    const user_id = (req.params.id)? req.params.id : user.data._id
    const roles = user.data.roles
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        })
        if(!store )
        { 
            if(
                (roles).includes('farmer') || 
                (roles).includes('accessory_trader') || 
                (roles).includes('product_trader')  || 
                (roles).includes('tool_trader')
            )
            {
                const store = await storeModel.create({user: user.data._id});
                res.json(store)
                
            }
            else{
                throw new Error("No stores found ")
            }
        }
        else{

            res.json(store)
        }
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.createStore = async (req, res) => {
    const { user } = req
    try {
        if(user){
            const store = await storeModel.create({user: user.data._id});
            res.json(store)
        }
        else{
            throw new Error('You have to login first')
        }
        
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.addProduct = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    const product = req.body.product
    const quantity = req.body.quantity
    const price_per_kg = req.body.price_per_kg
    const roles = user.data.roles
    console.log(roles)
    try {
        let store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        })
        if(!store){ 
            if(
                (roles).includes('farmer') || 
                (roles).includes('product_trader') 
            )
            {
                store = await storeModel.create({user: user.data._id});
                
            }
            else{
                throw new Error("No stores found ")
            }
        }
        let data = store.product_items
        let item_found = false
        let at_index = 0;
        for(i in data){
            if(data[i].product == product){
                item_found = true
                at_index = i
                break
            }
        }
        if(item_found){
            data[at_index].quantity += Number(quantity)
            data[at_index].price_per_kg = price_per_kg
        }else{
            data.push({
                product: product,
                quantity: quantity,
                price_per_kg: price_per_kg
            })
        }
        
        const updatedStore = await storeModel.findByIdAndUpdate(store._id, 
            {'$set': 
                {
                    product_items: data
                }
            },
            {new: true}
            
        )
        res.json(updatedStore)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.addMachinery = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    const machinery = req.body.machinery
    const quantity = req.body.quantity
    const price_per_piece = req.body.price_per_piece
    console.log(roles)
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        })
        if(!store){ 
            if(
                (roles).includes('farmer') || 
                (roles).includes('tool_trader') 
            )
            {
                const store = await storeModel.create({user: user.data._id});
                
            }
            else{
                throw new Error("No stores found ")
            }
        }
        let data = store.machinery_items
        let item_found = false
        let at_index = 0;
        for(i in data){
            if(data[i].machinery == machinery){
                item_found = true
                at_index = i
                break
            }
        }
        if(item_found){
            data[at_index].quantity += Number(quantity)
            data[at_index].price_per_piece = price_per_piece
        }else{
            data.push({
                machinery: machinery,
                quantity: quantity,
                price_per_piece: price_per_piece
            })
        }
        
        const updatedStore = await storeModel.findByIdAndUpdate(store._id, 
            {'$set': 
                {
                    machinery_items: data
                }
            },
            {new: true}
            
        )
        res.json(updatedStore)
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
exports.deleteItem = async (req, res) => {}
exports.adjustItem = async (req, res) => {}
exports.clearStore = async (req, res) => {}