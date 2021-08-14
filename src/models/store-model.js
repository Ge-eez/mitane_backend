const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StoreSchema = new mongoose.Schema({
    
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    
    product_items : [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
        quantity: { type: Number },
        price_per_kg: { type: Number},
    }],
    machinery_items : [{
        machinery: { type: mongoose.Schema.Types.ObjectId, ref: 'Machineries' },
        quantity: { type: Number,  },
        price_per_piece: { type: Number,  },
    }],
    ingredient_items : [{
        ingredients: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredients' },
        quantity: { type: Number,},
        price_per_kg: { type: Number, },
    }],
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

StoreSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Stores', StoreSchema);