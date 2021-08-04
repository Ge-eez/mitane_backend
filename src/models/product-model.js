
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true }],
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});


module.exports = mongoose.model('Products', ProductSchema);
