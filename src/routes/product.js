const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products-controller');

const {productPermission} = require('../middlewares/product_permission');
const express = require('express');
const router = express.Router({mergeParams: true});
/**
 * @typedef Product
 * @property {string} name.required - Product name
 * @property {string} category.required - Category id
 */
router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(productPermission(),updateProduct)
    .delete(productPermission(),deleteProduct);


module.exports = router;