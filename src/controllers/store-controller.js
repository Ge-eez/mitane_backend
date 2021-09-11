const storeModel = require('../models/store-model');
const machineryModel = require('../models/machinery-model');
const productModel = require('../models/product-model');
const ingredientModel = require('../models/ingredient-model');
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
            populate: { path: 'product_items.product', populate: {path: 'permissions'}}
        }
        // TODO
        const stores = await storeModel.paginate(query,options)
        
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
        const store = await storeModel.findById(req.params.id).populate([
            {path: 'user', select: "name"},
            {path:'product_items.product'},
            {path:'machinery_items.machinery'},
            {path:'ingredient_items.ingredients'},
          ])
        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.getByUserId = async (req, res) => {
    const user_id = req.params.id
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        }).populate([
            {path: 'user', select: "name"},
            {path:'product_items.product'},
            {path:'machinery_items.machinery'},
            {path:'ingredient_items.ingredients'},
          ])
        if(!store )
        { 
            throw new Error('User not found')
        }
        
        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.getSelfStore = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    const roles = user.data.roles
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        }).populate([
            {path: 'user', select: "name"},
            {path:'product_items.product',select:'name'},
            {path:'machinery_items.machinery'},
            {path:'ingredient_items.ingredients'},
          ])
        if(!store )
        { 
            throw new Error("User doesn't have a store")
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
    const roles = user.data.roles
    const user_id = user.data._id
    const coordinates = [req.body.longitude, req.body.latitude]

    try {
        if(user){
            
            const store = await storeService.createStore(user_id, roles, coordinates);
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

exports.addItemToStore = async (req, res) => {
    const { user } = req
    let user_id = user.data._id;
    try {
        if(user){
            let item_type;
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingredient)
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
                    else item_type = 'ingredient'
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
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingredient)
            let quantity = req.body.quantity
            let price = req.body.price
            let store;
            store = await storeModel.findById(req.params.id)
            if(store){
                if(req.body.product) item_type = 'product';
                else{
                    if(req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingredient'
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
            let item = req.body.product ? req.body.product : ( (req.body.machinery) ? req.body.machinery : req.body.ingredient)
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
                    else item_type = 'ingredient'
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
exports.getByMachineryId = async (req, res) => {
    const { user } = req;
    try {
        if(user){
            let item_id = req.body.machinery;
            let item;
            item = await machineryModel.findById(item_id);

            if(item){
                const stores = await storeModel.find({
                    machinery_items: {$elemMatch: 
                        {machinery: item_id}
                    },
                    location : {
                        $near: {
                          $geometry: {
                            type: "Point",
                            coordinates : [longitude, latitude]
                          },
                        }
                      }
                }).populate([
                    {path: "user", select: 
                    "location name phone_no",
                     populate: {path: 'roles', select: "name-_id"} },
                    {path:'product_items.product'},
                    {path:'machinery_items.machinery'},
                    {path:'ingredient_items.ingredients'},
                  ]);
                res.json(stores);           
            }
            else{
                throw new Error("machinery not found")
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
exports.getMachineries = async (req, res) => {
    const { user } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if(user){
            
            const stores = await storeModel.find({
                $expr:{$gt:[{$size:"$machinery_items"},0]},
                location : {
                    $near: {
                      $geometry: {
                        type: "Point",
                        coordinates : [longitude, latitude]
                      },
                    }
                  }
            }).populate([
                {path: "user", select: 
                "location name phone_no",
                 populate: {path: 'roles', select: "name-_id"} },
                {path:'product_items.product'},
                {path:'machinery_items.machinery'},
                {path:'ingredient_items.ingredients'},
              ]);
            res.json(stores);   
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
exports.getByProductId = async (req, res) => {
    const { user } = req;
    try {
        if(user){
            let item_id = req.body.product;
            let item;
            item = await productModel.findById(item_id);

            if(item){
                const stores = await storeModel.find({
                    product_items: {$elemMatch: 
                        {product: item_id}
                    },
                    location : {
                        $near: {
                          $geometry: {
                            type: "Point",
                            coordinates : [longitude, latitude]
                          },
                        }
                      }
                }).populate([
                    {path: "user", select: 
                    "location name phone_no",
                     populate: {path: 'roles', select: "name-_id"} },
                    {path:'product_items.product'},
                    {path:'machinery_items.machinery'},
                    {path:'ingredient_items.ingredients'},
                  ]);
                res.json(stores);         
            }
            else{
                throw new Error("product not found")
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
exports.getProducts = async (req, res) => {
    const { user } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if(user){
            
            const stores = await storeModel.find({
                $expr:{$gt:[{$size:"$product_items"},0]},
                location : {
                    $near: {
                      $geometry: {
                        type: "Point",
                        coordinates : [longitude, latitude]
                      },
                    }
                  }
            }).populate([
                {path: "user", select: 
                "location name phone_no",
                 populate: {path: 'roles', select: "name-_id"} },
                {path:'product_items.product'},
                {path:'machinery_items.machinery'},
                {path:'ingredient_items.ingredients'},
              ]);
                
            res.json(stores);      
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
exports.getByingredientsId = async (req, res) => {
    const { user } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;

    try {
        if(user){
            let item_id = req.body.ingredient;
            let item;
            item = await ingredientModel.findById(item_id);

            if(item){
                const stores = await storeModel.find({
                    ingredient_items: {$elemMatch: 
                        {ingredients: item_id}
                    },
                    location : {
                        $near: {
                          $geometry: {
                            type: "Point",
                            coordinates : [longitude, latitude]
                          },
                        }
                      }
                }).populate([
                    {path: "user", select: 
                    "location name phone_no",
                     populate: {path: 'roles', select: "name-_id"} },
                    {path:'product_items.product'},
                    {path:'machinery_items.machinery'},
                    {path:'ingredient_items.ingredients'},
                  ]);
                res.json(stores);            
            }
            else{
                throw new Error("ingredient not found")
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
exports.getIngredients = async (req, res) => {
    const { user } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if(user){
            
            const stores = await storeModel.find({
                $expr:{$gt:[{$size:"$ingredient_items"},0]},
                location : {
                    $near: {
                      $geometry: {
                        type: "Point",
                        coordinates : [longitude, latitude]
                      },
                    }
                  }
            }).populate([
                {path: "user", select: 
                "location name phone_no",
                 populate: {path: 'roles', select: "name-_id"} },
                {path:'product_items.product'},
                {path:'machinery_items.machinery'},
                {path:'ingredient_items.ingredients'},
              ]);
            res.json(stores);    
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

exports.clearStore = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    try {
        if(user){
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })

            if(store){
                store = await storeService.clearStore(store);
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
exports.deleteStore = async (req, res) => {
    const { user } = req
    const user_id = user.data._id
    try {
        if(user){
            let store;
            store = await storeModel.findOneAndDelete({
                user: {
                    $in: user_id
                }
            }).populate([
                {path: 'user', select: "name"},
                {path:'product_items.product'},
                {path:'machinery_items.machinery'},
                {path:'ingredient_items.ingredients'},
              ])

            if(store){
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
