const express = require('express');
const router = express.Router();

const {
    getDailyPrice,
    getDailyPriceByProduct,
    createDailyPrice,
    deleteProductPrice,
    deleteDailyPrice,
    getDailyPriceById,
    addDailyPrice,
} = require('../controllers/price-controller');


/**
 * Get Price
 * @route Get /price
 * @group Price
 * @param {string} - Product name
 * @param {string} - Date in string format YYYY-MM-DD
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/').get(getDailyPrice);

/**
 * Get Price
 * @route Put /price/:productName?date=YYYY-MM-DD
 * @group Price
 * @param {string} - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
 router.route('/:productName').get(getDailyPriceByProduct);

/**
 * Create daily price
 * @route Put /price
 * @group Price
 * @param {string} - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/').post(createDailyPrice);

    
/**
 * Get Price
 * @route Put /product/:productName
 * @group Price
 * @param {string} - product Id
 * @param {string} - daily price of product
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:productName').put(addDailyPrice);

/**
 * Get Price
 * @route Put /price/:productName
 * @group Price
 * @param {string} - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:productName').delete(deleteProductPrice);

/**
 * Get Price
 * @route Put /price/:productName?date=YYYY-MM-DD
 * @group Price
 * @param {string} - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/').put(deleteDailyPrice);

module.exports = router;