const express = require('express');
const router = express.Router();

const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/agri_product_category');

router.route('/')
    .get(getCategory)
    .post(createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;