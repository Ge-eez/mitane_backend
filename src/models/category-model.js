
const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});


module.exports = mongoose.model('Categories', CategorySchema);
