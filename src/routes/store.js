var router = require("express-promise-router")();
const storeController = require('../controllers/store-controller');

// Pagination left
router.get('/', storeController.getAll);

// Done
router.get('/:id', storeController.getByID);
router.get('/user/:id', storeController.getByUserId);
router.post('/', storeController.createStore);
router.post('/add_product', storeController.addItemToStore);
router.post('/add_machinery', storeController.addItemToStore);

// router.delete('/:id', storeController.deleteStore);

// router.get('/:machinery_id', storeController.getByMachineryId);
// router.get('/:product_id', storeController.getByProductId);
// router.get('/:ingridient_id', storeController.getByIngridientId);
// router.get('/:keyword', storeController.getByKeyword);

// router.post('/delete_item', storeController.deleteItem);


// router.delete('/clear_store', storeController.clearStore);

// Testing remains
router.put('/:id', storeController.updateStore);
router.post('/add_ingridient', storeController.addItemToStore);

module.exports = router;