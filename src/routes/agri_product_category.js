const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/agri_product_category');

//Include other resource routes
const productRouter = require('./agri_products');

const express = require('express');
const router = express.Router();

//Re-route to other resource route
router.use('/:categoryId/products',productRouter);

router.route('/')
    .get(getCategory)
    .post(createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = router;