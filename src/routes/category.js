const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category-controller');

//Include other resource routes
const productRouter = require('./product');

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