const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PriceSchema = mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Products',required:true},
    price_of_the_day:[{
        price:{type:Number, required:true},
        day:{type:Date, default:Date.now}
    }]
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}});

PriceSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Prices',PriceSchema);