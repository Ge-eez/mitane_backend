const storeModel = require('../models/store-model');
const storeService = require('../services/store-services');

exports.getAll = async (req, res, next) => {

    try {

        let sort = {}
        if(req.query.sort) {
            sort[req.query.sort] = req.query.asc ? 1 :-1 
        }

        let query = {}

        if(req.query.filter) {
            let filter = JSON.parse(req.query.filter);
            query = pick(filter, ['name', 'active']) 
            
        }
        
        const options = {
            sort: Object.values(sort).length > 0 ? sort: {
                'created_at': -1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: { path: 'roles', populate: {path: 'permissions'}}
        }
        // TODO
        const stores = await storeModel.paginate(query,options).populate('user', 'name').populate('product_items.product', 'name')
        
        res.json(stores)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
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
            const store = storeService.createStore(user_id, roles);
            res.json(store)
        }
        
        res.json(store)
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
            
            const store = storeService.createStore(user_id, roles);
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

// exports.addProduct = async (req, res) => {
//     const { user } = req
//     const user_id = user.data._id
//     const product = req.body.product
//     const quantity = req.body.quantity
//     const price_per_kg = req.body.price_per_kg
//     const roles = user.data.roles
//     console.log(roles)
//     try {
        // let store = await storeModel.findOne({
        //     user: {
        //         $in: user_id
        //     }
        // })
//         if(!store){ 
//             const store = storeService.createStore(user_id, roles);
            
//         }
//         let data = store.product_items
//         let item_found = false
//         let at_index = 0;
//         for(i in data){
//             if(data[i].product == product){
//                 item_found = true
//                 at_index = i
//                 break
//             }
//         }
//         if(item_found){
//             data[at_index].quantity += Number(quantity)
//             data[at_index].price_per_kg = price_per_kg
//         }else{
//             data.push({
//                 product: product,
//                 quantity: quantity,
//                 price_per_kg: price_per_kg
//             })
//         }
        
//         const updatedStore = await storeModel.findByIdAndUpdate(store._id, 
//             {'$set': 
//                 {
//                     product_items: data
//                 }
//             },
//             {new: true}
            
//         )
//         res.json(updatedStore)
//     } catch (error) {
//         res.status(404).json({
//             error: true,
//             message: error.message
//         })
//     }

// }

exports.addItemToStore = async (req, res) => {
    const { user } = req
    let user_id = user.data._id;
    try {
        if(user){
            let item_type;
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingridient)
            let quantity = req.body.quantity
            let price = req.body.price
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })
            if(store){
                if(req.body.product) item_type = 'product';
                else{
                    if(req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingridient'
                }
                store = await storeService.addItem(item_type, item, quantity, price, store);
                res.json(store);            
            }
            else{
                throw new Error("store not found")
            }
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

exports.updateStore = async (req, res) => {
    const { user } = req
    try {
        if(user){
            let item_type;
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingridient)
            let quantity = req.body.quantity
            let price = req.body.price
            let store;
            store = await storeModel.findById(req.params.id)
            if(store){
                if(req.body.product) item_type = 'product';
                else{
                    if(req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingridient'
                }
                store = await storeService.updateStore(item_type, item, quantity, price, store);
                res.json(store);            
            }
            else{
                throw new Error("store not found")
            }
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
exports.deleteItem = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    try {
        if(user){
            let item_type;
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingridient)
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })

            if(store){
                if(req.body.product) item_type = 'product';
                else{
                    if(req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingridient'
                }
                store = await storeService.removeItem(item_type, item, store);
                res.json(store);            
            }
            else{
                throw new Error("store not found")
            }
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
exports.getByMachineryId = async (req, res) => {}
exports.getByProductId = async (req, res) => {}
exports.getByKeyword = async (req, res) => {}

exports.clearStore = async (req, res) => {}
exports.deleteStore = async (req, res) => {}