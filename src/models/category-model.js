const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

// plugins
CategorySchema.plugin(mongoosePaginate);
//index 
CategorySchema.index({name:'text'});
module.exports = mongoose.model('Categories', CategorySchema);
