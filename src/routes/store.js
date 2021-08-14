var router = require("express-promise-router")();
const storeController = require('../controllers/store-controller');

/**
 * @typedef Store
 * @property {string} user.required - A trader or a farmer's id
 * @property {array} product_items.required - {product_id, price, quatity}
 * @property {array} machinery_items.required - {machinery_id, price, quatity}
 * @property {array} ingredient_items.required - {ingredient_id, price, quatity}
 */

/**
 * Get a store 
 * 
 * @route GET /store/self
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object of that user
 * @returns {Error}  default - Unexpected error
 */
 router.get('/self', storeController.getSelfStore);

/**
 * Returns ALL stores
 * 
 * @route GET /store
 * @group Store - Deals with all CRUD operations with store model
 * @param {string} sort.query - sort parament
 * @param {string} page.query - set the page number
 * @param {string} filter.query - set filter query 
 * @security JWT
 * @returns {object} 200 - Array of companies
 * @returns {Error}  default - Unexpected error
 */
router.get('/', storeController.getAll);

/**
 * Get a store 
 * 
 * @route GET /store/{id}
 * @group Store 
 * @param {string} id.path.required - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', storeController.getByID);

/**
 * Create a new store 
 * 
 * @route POST /store
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', storeController.createStore);

/**
 * Add new product
 * 
 * @route POST /store/add_product
 * @group Store 
 * @param {string} product.path.required - product id
 * @param {number} quantity.path.required - product quantity
 * @param {number} price.path.required - product price
 * @security JWT
 * @returns {object} 200 - Store object with the added product item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_product', storeController.addItemToStore);

/**
 * Add new product
 * 
 * @route POST /store/add_machinery
 * @group Store 
 * @param {string} machinery.path.required - machinery id
 * @param {number} quantity.path.required - machinery quantity
 * @param {number} price.path.required - machinery price
 * @security JWT
 * @returns {object} 200 - Store object with the added machinery item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_machinery', storeController.addItemToStore);

/**
 * Add new product
 * 
 * @route POST /store/add_ingredients
 * @group Store 
 * @param {string} product.path.required - ingredient id
 * @param {number} quantity.path.required - ingredient quantity
 * @param {number} price.path.required - ingredient price
 * @security JWT
 * @returns {object} 200 - Store object with the added ingredient item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_ingredient', storeController.addItemToStore);

/**
 * Update a store 
 * @route PUT /store/product/{id}
 * @group Store 
 * @param {string} product.path.required - product id
 * @param {number} quantity.path.required - product quantity
 * @param {number} price.path.required - product price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/product/:id', storeController.updateStore);

/**
 * Update a store 
 * @route PUT /store/machinery/{id}
 * @group Store 
 * @param {string} product.path.required - machinery id
 * @param {number} quantity.path.required - machinery quantity
 * @param {number} price.path.required - machinery price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/machinery/:id', storeController.updateStore);

/**
 * Update a store 
 * @route PUT /store/ingredient/{id}
 * @group Store 
 * @param {string} product.path.required - ingredient id
 * @param {number} quantity.path.required - ingredient quantity
 * @param {number} price.path.required - ingredient price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/ingredient/:id', storeController.updateStore);

/**
 * Delete product from store 
 * @route Delete /store/product
 * @group Store 
 * @param {string} product.path.required - product id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/product', storeController.deleteItem);

/**
 * Delete machinery from store 
 * @route Delete /store/machinery
 * @group Store 
 * @param {string} machinery.path.required - machinery id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
 router.delete('/machinery', storeController.deleteItem);

 /**
 * Delete ingredient from store 
 * @route Delete /store/ingredient
 * @group Store 
 * @param {string} ingredient.path.required - ingredient id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/ingredient', storeController.deleteItem);

 /**
 * Clear Store
 * @route Patch /store/clear_store
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/clear_store', storeController.clearStore);

 /**
 * Clear Store
 * @route Patch /store/clear_store
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', storeController.deleteStore);
router.get('/user/:id', storeController.getByUserId);

// Todo
// router.get('/:machinery_id', storeController.getByMachineryId);
// router.get('/:product_id', storeController.getByProductId);
// router.get('/:ingredients_id', storeController.getByingredientsId);
// router.get('/:keyword', storeController.getByKeyword);


// Testing remains

module.exports = router;