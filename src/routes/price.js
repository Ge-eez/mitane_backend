const express = require('express');
const router = express.Router();

const {
    getDailyPrice,
    getPrice,
    createDailyPrice,
    deleteProductPrice,
    deleteDailyPrice,
    addDailyPrice,
} = require('../controllers/price-controller');
const {pricePermission} = require('../middlewares/permission');

/**
 * @typedef Price
 * @property {string} product.required - Product id
 * @property {array} price_of_the_day.required - price, day
 */

/**
 * Get daily price
 * @route Get /price/{date}
 * @group Price
 * @security JWT
 * @param {string} date.path.required - price date
 * @returns {object} 200 - Price object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:date').get(getDailyPrice);

/**
 * Get price
 * @route Get /price
 * @group Price
 * @security JWT
 * @param {string} product.query product name
 * @returns {object} 200 - Price object
 * @returns {Error}  default - Unexpected error
 */
 router.route('/').get(getPrice);

/**
 * Create daily price
 * @route Post /price
 * @group Price
 * @security JWT
 * @param {string} product.body.required - product name 
 * @returns {object} 200 - A Price object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').post(pricePermission(),createDailyPrice);

    
/**
 * Insert daily price of a product
 * @route Put /product/:productName
 * @group Price
 * @security JWT
 * @param {string} productName.path.required - product name
 * @param {number} price.body.required - daily price of product
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:productName').put(pricePermission(),addDailyPrice);

/**
 * Delete prices of a product
 * @route Delete /price/:productName
 * @group Price
 * @security JWT
 * @param {string} productName.path.required - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:productName').delete(pricePermission(),deleteProductPrice);

/**
 * Delete daily price of product by date
 * @route Put /price
 * @group Price
 * @security JWT
 * @param {string} product.body.required- product name
 * @param {string} date.body.required- date name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/').put(deleteDailyPrice);

module.exports = router;