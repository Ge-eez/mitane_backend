
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StoreSchema = new mongoose.Schema({
    
    product_items : [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number, required: true },
        price_per_kg: { type: Number, required: true },
    }],
    machinery_items : [{
        machinery: { type: mongoose.Schema.Types.ObjectId, ref: 'Machineries' },
        quantity: { type: Number, required: true },
        price_per_piece: { type: Number, required: true },
    }],
    ingridient_items : [{
        ingridient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingridients' },
        quantity: { type: Number, required: true },
        price_per_kg: { type: Number, required: true },
    }],
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

StoreSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Stores', StoreSchema);