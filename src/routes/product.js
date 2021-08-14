const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products-controller');

const {permission} = require('../middlewares/permission');
const express = require('express');
const router = express.Router({mergeParams: true});

/**
 * @typedef Product
 * @property {string} name.required - Product name
 * @property {string} category.required - Category id
 */

/**
 * Get products 
 * 
 * @route Get /product
 * @group Product 
 * @security JWT
 * @param {string} keyword.query - category or product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').get(getProducts);

/**
 * Create product
 * 
 * @route Post /product
 * @group Product 
 * @security JWT
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').post(permission(),createProduct);

/**
 * Get product by Id 
 * 
 * @route Get /product/{id}
 * @group Product 
 * @security JWT
 * @param {string} id.path.required - category Id
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:id').get(getProductById);

/**
 * Update a product
 * 
 * @route Put /product/{name}
 * @group Product 
 * @security JWT
 * @param {string} name.path.required - product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').put(permission(),updateProduct);

/**
 * Delete a product 
 * 
 * @route Delete /product/:name
 * @group Product 
 * @security JWT
 * @param {string} name.path.required - product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').delete(permission(),deleteProduct);


module.exports = router;