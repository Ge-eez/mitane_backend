const storeModel = require('../models/store-model');

exports.createStore = async (user_id, roles) => {
    try {
        if(
            (roles).includes('farmer') || 
            (roles).includes('accessory_trader') || 
            (roles).includes('product_trader')  || 
            (roles).includes('tool_trader')
        )
        {
            const store = await storeModel.create({user: user_id});
            return store
            
        }
        else{
            throw new Error("Can't create store")
        }
        
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.addItem = async (item_type, item, quantity, price, store) => {
    try {
        let data;
        if(item_type == "product") data = store.product_items
        else if(item_type == "machinery") data = store.machinery_items
        else if(item_type == "ingredient") data = store.ingredient_items
        
        let item_found = false
        let at_index = 0;
        for(i in data){
            if(data[i][item_type] == item){
                item_found = true
                at_index = i
                break
            }
        }
        if(item_found){
            data[at_index].quantity += Number(quantity)
            if(item_type == "product" || item_type == "ingredient") {
                data[at_index].price_per_kg = price;
            }
            else{
                data[at_index].price_per_piece = price;
            }
        }else{
            let new_item = {}
            new_item.quantity = quantity
            if(item_type == "product") {
                new_item.product = item
                new_item.price_per_kg = price
            }
            else{
                if(item_type == "ingredient") {
                    new_item.ingredients = item
                    new_item.price_per_kg = price
                }
                else{
                    new_item.machinery = item
                    new_item.price_per_piece = price
                }
            }
            data.push(new_item)
        }
        
        let updatedStore;

        if(item_type == "product") {
            updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                {'$set': 
                    {
                        product_items: data
                    }
                },
                {new: true}
                
            )
        }
        else{
            if(item_type == "machinery"){

                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            machinery_items: data
                        }
                    },
                    {new: true}
                )
            }
            else{
                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            ingredient_items: data
                        }
                    },
                    {new: true}
                )
            }
        }
        return updatedStore
    } catch (error) {
        throw error
    }

}

exports.removeItem = async (item_type, item, store) => {
    try {
        let data;
        if(item_type == "product") data = store.product_items
        else if(item_type == "machinery") data = store.machinery_items
        else if(item_type == "ingredient") data = store.ingredient_items
        
        let item_found = false
        let at_index = 0;
        for(i in data){
            if(data[i][item_type] == item){
                item_found = true
                at_index = i
                break
            }
        }
        if(item_found){
            data.splice(at_index, 1)
        }else{
            throw new Error("Item not found")
        }
        console.log(data)
        let updatedStore;

        if(item_type == "product") {
            updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                {'$set': 
                    {
                        product_items: data
                    }
                },
                {new: true}
                
            )
        }
        else{
            if(item_type == "machinery"){

                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            machinery_items: data
                        }
                    },
                    {new: true}
                )
            }
            else{
                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            ingredient_items: data
                        }
                    },
                    {new: true}
                )
            }
        }
        
        return updatedStore
    } catch (error) {
        return error
    }

}


exports.clearStore = async (store) => {
    try {
        let updatedStore = await storeModel.findByIdAndUpdate(store._id, 
            {'$set': 
                {
                    ingredient_items: [],
                    product_items: [],
                    machinery_items: []

                }
            },
            {new: true}
        )
        
        return updatedStore
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.updateStore = async (item_type, item, quantity, price, store) => {
    try {
        let data;
        if(item_type == "product") data = store.product_items
        else if(item_type == "machinery") data = store.machinery_items
        else if(item_type == "ingredient") data = store.ingredient_items
        
        let item_found = false
        let at_index = 0;
        for(i in data){
            if(data[i][item_type] == item){
                item_found = true
                at_index = i
                break
            }
        }
        if(item_found){
            data[at_index].quantity = Number(quantity)
            if(item_type == "product" || item_type == "ingredient") {
                data[at_index].price_per_kg = price;
            }
            else{
                data[at_index].price_per_piece = price
            }
        }
        else{
            throw new Error("Item not found")
        }
        
        let updatedStore;

        if(item_type == "product") {
            updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                {'$set': 
                    {
                        product_items: data
                    }
                },
                {new: true}
                
            )
        }
        else{
            if(item_type == "machinery"){

                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            machinery_items: data
                        }
                    },
                    {new: true}
                )
            }
            else{
                updatedStore = await storeModel.findByIdAndUpdate(store._id, 
                    {'$set': 
                        {
                            ingredient_items: data
                        }
                    },
                    {new: true}
                )
            }
        }
        return updatedStore
    } catch (error) {
        throw error
    }

}

exports.searchItem = async (item_type, item) => {
    
}

exports.getStoresNearby = async function (param){
    const {
      latitude, longitude
    } = param
    
      let theNearest = await storeModel.find(
        {
          location : {
            $near: {
              $geometry: {
                type: "Point",
                coordinates : [longitude, latitude]
              },
            }
          }
        }
      )
      return theNearest 

    }